import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './memoryModal.html';
import { Memories } from '../../api/memories/memories.js';


import { displayError } from '../lib/errors.js';

  Template.memoryModal.onCreated(function todosItemOnCreated() {
    this.autorun(() => {
      Session.set('memoryModalStorage', {category: '', isDisabled: false});
    });
  });

  Template.memoryModal.helpers({
    categories() {
      return _.chain(Memories.find().fetch()).pluck('category').unique().value();
    },
    categoryName() {
      return Session.get('memoryModalStorage').category;
    },
    isDisabledButton() {
      return Session.get('memoryModalStorage').isDisabled ? {disabled: 'disabled'} : {};
    },
    isDisabled() {
      return Session.get('memoryModalStorage').isDisabled;
    }
  });


  Template.memoryModal.events({
    'change ._addCategory':function(event,context) {
      var storage = Session.get('memoryModalStorage');
      storage.category = event.target.value;
      Session.set('memoryModalStorage', storage);
      },
    'click ._chooseCategory':function(event,context) {
      var storage = Session.get('memoryModalStorage');
      storage.category = event.currentTarget.textContent;
      Session.set('memoryModalStorage', storage);
    },
    'click .closeMemoryModal':function(event) {
      $('.memory-form').trigger("reset");
       Session.set('memoryModalStorage', {category: '', isDisabled: false});
    },
    'submit .memory-form'(event) {
      event.preventDefault();
      var target = event.target;
      var title = target.title.value;
      var memo = target.memo.value;
      var category = target.category.value;
      Meteor.call('memories.insert', {
        title: title,
        memo: memo,
        category: category,
        userId: Meteor.userId()
      });
      $('.memory-form').trigger("reset");
       Session.set('memoryModalStorage', {category: '', isDisabled: false});
      $('#memoryModal').modal('hide');
    },
    'focus input[type=text]'() {
      this.onEditingChange(true);
    },
  });
