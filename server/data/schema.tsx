/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

 /* eslint no-unused-vars: "off", no-use-before-define: "off" */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  TextEntity,
  getUser,
  getViewer,
  getEntity,
  getEntities,
  addEntity,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === "TextEntity") {
      return getEntity(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof TextEntity) {
      return textEntityType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString
    },
    timeline: {
      type: textEntityConnection,
      description: "User's timeline of entities",
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getEntities(), args),
    },
    entities: {
      type: textEntityConnection,
      description: "User's collection of saved entities",
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getEntities(), args),
    },
  }),
  interfaces: [nodeInterface],
});

var textEntityType = new GraphQLObjectType({
  name: 'TextEntity',
  description: 'Entity formatted text input',
  fields: () => ({
    id: globalIdField('TextEntity'),
    title: {
      type: GraphQLString,
      description: 'The title of the entity',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the entity',
    },
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here.
 *
 * Connection types include edges and pageInfo, for pagination.
 */

var {connectionType: textEntityConnection, edgeType: textEntityEdge} =
  connectionDefinitions({name: 'TextEntity', nodeType: textEntityType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
  }),
});

var entityMutation = mutationWithClientMutationId({
  name: 'IntroduceEntity',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    node: {
      type: textEntityType,
      resolve: payload => getEntity(payload.entityId),
    },
    edge: {
      type: textEntityEdge,
      resolve: payload => ({
        node: getEntity(payload.entityId),
        cursor: 123
      }),
    },
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({title, content}) => {
    return { entityId: addEntity({title, content}) };
  },
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    introduceEntity: entityMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
