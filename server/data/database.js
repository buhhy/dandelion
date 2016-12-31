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

var entities = [
  'This is a test value',
  'Hello Bob',
  'I really like mango mousse'
].map((value, i) => {
  var entity = new TextEntity();
  entity.id = `${i}`;
  entity.draftId = `${i}`;
  entity.createDate = +new Date;
  entity.modifyDate = +new Date;
  entity.deleteDate = +new Date;
  entity.title = value;
  entity.content = value + ' ' + value;
  return entity;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getEntity: (id) => entities.find(e => e.id === id),
  getEntities: () => entities,
  User,
  TextEntity,
};