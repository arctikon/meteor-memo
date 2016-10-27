import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Memories } from '../../api/memories/memories.js';

import './memoryDeleteModal.html';

Template.memoryDeleteModal.events({
  'click .removeMemory'(event) {
    var id = Session.get('memoryDeleteModalStorage')._id;
    Meteor.call('memories.remove', {id: id});
    // Meteor.call('memories.removeByCategory', {category: 'cat5'});
    Session.clear('memoryDeleteModalStorage');
    $('#memoryDeleteModal').modal('hide');
  },
});
