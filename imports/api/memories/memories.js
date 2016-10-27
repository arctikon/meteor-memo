import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Memories = new Mongo.Collection('Memories');

Memories.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  title: { type: String },
  memo: { type: String },
  category: { type: String },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Memories.attachSchema(Memories.schema);

Memories.publicFields = {
  _id: 1,
  title: 1,
  userId: 1,
  memo: 1,
  category: 1,
};


Memories.helpers({
  editableBy(userId) {
    if (!this.userId) {
      return true;
    }
    return this.userId === userId;
  },
});
