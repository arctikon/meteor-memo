import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import './memoryEditModal.html';
import { Memories } from '../../api/memories/memories.js';


import { displayError } from '../lib/errors.js';


Template.memoryEditModal.onCreated(function() {
  Session.set('memoryEditModalStorage', {title: '', memo: '', category: '' });
});


Template.memoryEditModal.helpers({
  categories() {
    return _.chain(Memories.find().fetch()).pluck('category').unique().value();
  },
  title: function() {
    return Session.get('memoryEditModalStorage').title;
  },
  memo: function() {
    return Session.get('memoryEditModalStorage').memo;
  },
  categoryName: function() {
    return Session.get('memoryEditModalStorage').category;
  }
});



Template.memoryEditModal.events({
  'submit .memory-edit-form'(event) {
    event.preventDefault();
    var target = event.target;
    var title = target.title.value;
    var memo = target.memo.value;
    var category = target.category.value;
    Meteor.call('memories.update', {
      id: Session.get('memoryEditModalStorage')._id,
      title: title,
      memo: memo,
      category: category
    });
 
    $('#memoryEditModal').modal('hide');
  },
  'change ._addCategory':function(event,context) {
     var storage = Session.get('memoryEditModalStorage');
     storage.category = event.target.value;
     Session.set('memoryEditModalStorage', storage);
  },
  'click ._chooseCategory':function(event,context) {
     var storage = Session.get('memoryEditModalStorage');
     storage.category = event.currentTarget.textContent;
     Session.set('memoryEditModalStorage', storage);
  },
  'click .closeMemoryModal':function(event) {
     $('.memory-form').trigger("reset");
     Template.memoryEditModal.categoryName.set('');
  },
});
