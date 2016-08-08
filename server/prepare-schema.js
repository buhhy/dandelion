import fs from 'fs';
import { Schema } from './data/schema';
import { graphql }  from 'graphql';
import { introspectionQuery/*, printSchema*/ } from 'graphql/utilities';

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
        fs.writeFileSync('../shared/schema.json', str);
    }
})();

// Save user readable type system shorthand of schema
// This currently fails with an invariant error where a GraphQLInterfaceType
// does not seem to instanceof GraphQLInterfaceType.
// fs.writeFileSync(
//     './data/schema.graphql',
//     printSchema(Schema)
// );
