import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Memories } from '../../api/memories/memories.js';

import './categoryDeleteModal.html';

Template.categoryDeleteModal.events({
  'click .removeMemory'(event) {
    var category = Session.get('categoryDeleteModalStorage').category;
    Meteor.call('memories.removeByCategory', {category: category});
    Session.clear('categoryDeleteModalStorage');
    $('#categoryDeleteModal').modal('hide');
  },
});
