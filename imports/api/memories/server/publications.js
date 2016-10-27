
import { Meteor } from 'meteor/meteor';

import { Memories } from '../memories.js';


Meteor.publish('memories.list', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Memories.find({}, {fields: Memories.publicFields});
});

Meteor.publish('memories.scrollList', function (limit) {
  check(limit, Number);
  if (!this.userId) {
    return this.ready();
  }

  return Memories.find({}, {fields: Memories.publicFields, limit: limit });
});
