import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Memories } from './memories.js';

export const insert = new ValidatedMethod({
  name: 'memories.insert',
  validate: new SimpleSchema({
    title: {type: String},
    memo: {type: String},
    category: {type: String},
    userId: {type: String},
  }).validator(),
  run({ title, memo, category, userId}) {
    return Memories.insert({title: title, memo: memo, category: category, userId: userId});
  },
});


export const updateName = new ValidatedMethod({
  name: 'memories.update',
  validate: new SimpleSchema({
    id: Memories.simpleSchema().schema('_id'),
    title: Memories.simpleSchema().schema('title'),
    memo: Memories.simpleSchema().schema('memo'),
    category: Memories.simpleSchema().schema('category'),
  }).validator({ clean: true, filter: false }),
  run({ id, title, memo, category }) {
    Memories.update(id, {
      $set: { title: title, memo: memo, category: category },
    });
  },
});


export const remove = new ValidatedMethod({
  name: 'memories.remove',
  validate: null,
  run({ id }) {
    Memories.remove(id);
  },
});

export const removeByCategory = new ValidatedMethod({
  name: 'memories.removeByCategory',
  validate: null,
  run({ category }) {
    Memories.remove({category: category});
  },
});