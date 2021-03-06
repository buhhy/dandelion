import * as chokidar from 'chokidar';
import * as express from 'express';
import * as graphQLHTTP from 'express-graphql';
import {clean} from 'require-clean';

const GRAPHQL_PORT = 8080;

let graphQLServer;

function startGraphQLServer(callback) {
    try {
        clean('./data/schema.tsx');
    } catch (e) {
        // Errors when not found, so of course never works the first time...
    }
    const {Schema} = require('./data/schema.tsx');
    const graphQLApp = express();
    graphQLApp.use('/', graphQLHTTP({
        graphiql: true,
        pretty: true,
        schema: Schema,
    }));
    graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
        console.log(
            `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
        );
        if (callback) {
            callback();
        }
    });
}

function startServers(callback) {
    // Shut down the server
    if (graphQLServer) {
        graphQLServer.close();
    }

    // Compile the schema
    startGraphQLServer(callback);
}
const watcher = chokidar.watch('./data/schema.tsx');
watcher.on('change', path => {
    console.log(`\`${path}\` changed. Restarting.`);
    startServers(() =>
        console.log('Restart your browser to use the updated schema.')
    );
});
startServers();
