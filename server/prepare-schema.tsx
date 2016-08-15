import * as fs from 'fs';
import { Schema } from './data/schema';
import { graphql } from 'graphql';
import { introspectionQuery/*, printSchema*/ } from 'graphql/utilities';

console.log('Updating JSON of full schema introspection for Babel Relay Plugin to use');

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
    const result = await graphql(Schema, introspectionQuery);
    if (result.errors) {
        console.error(
            'ERROR introspecting schema: ',
            JSON.stringify(result.errors, null, 2)
        );
    } else {
        const str = JSON.stringify(result, null, 2);
        fs.writeFile('../shared/schema.json', str, err => {
            if (err) {
                console.error('Failed to update schema.json:', err);
            } else {
                console.log('Done updating schema.json!');
            }
        });
    }
})();

// Save user readable type system shorthand of schema
// This currently fails with an invariant error where a GraphQLInterfaceType
// does not seem to instanceof GraphQLInterfaceType.
// fs.writeFileSync(
//     './data/schema.graphql',
//     printSchema(Schema)
// );
