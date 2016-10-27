
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import './app-body.html';
import '../pages/login.html';

const CONNECTION_ISSUE_TIMEOUT = 5000;

const showConnectionIssue = new ReactiveVar(false);

Accounts.onLogin(function() {
  $('#signin_modal').modal('hide');
});

Meteor.startup(() => {
  setTimeout(() => {
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);
});


Template.App_body.helpers({
  connected() {
    if (showConnectionIssue.get()) {
      return Meteor.status().connected;
    }
    return true;
  },
});


Template.App_body.events({

  'click .__signin': function() {
    $('#signin_modal').modal('show');
  },

  'click .__logout': function() {
    Meteor.logout(function(err) {
      $('#signin_modal').modal('hide');
    });
  },

  'click .js-logout'() {
    Meteor.logout();
  },

});
