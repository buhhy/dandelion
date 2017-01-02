/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User {}
class Entity {}
class TextEntity extends Entity {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

const makeEntity = ({title, content}, i) => {
  const entity = new TextEntity();
  entity.id = `${i}`;
  entity.draftId = `${i}`;
  entity.createDate = +new Date;
  entity.modifyDate = +new Date;
  entity.deleteDate = +new Date;
  entity.title = title;
  entity.content = content;
  return entity;
};

let entities = [
  'This is a test value',
  'Hello Bob',
  'I really like mango mousse'
].map((value, i) => makeEntity({title: value}, i));

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getEntity: (id) => entities.find(e => e.id === id),
  getEntities: () => entities,
  addEntity: ({draftId, title, content}) => {
    const idx = entities.length;
    const newEntities = [makeEntity({title, content}, idx)];
    entities = newEntities.concat(entities);
    return idx;
  },
  User,
  TextEntity,
};
