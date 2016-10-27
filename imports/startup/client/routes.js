import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/app-memos.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_mainpage' });
  },
});

FlowRouter.route('/memos', {
  name: 'App.memos',
  action() {
    BlazeLayout.render('App_body', { main: 'App_memos' });
  },
});

