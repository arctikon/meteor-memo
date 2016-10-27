import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Memories } from '../../api/memories/memories.js';

import './app-memos.html';

import '../modals/memoryModal.js';
import '../modals/memoryEditModal.js';
import '../modals/memoryDeleteModal.js';
import '../modals/categoryDeleteModal.js';

var categories = [];

function showMoreVisible() {
    var increment = 12;
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      Session.set("itemsLimit", Session.get("itemsLimit") + increment);
    }       
}

$(window).scroll(showMoreVisible);


Template.registerHelper('arrayify',function(obj){
    var result = [];
    var index = 0;
    for (var key in obj){
      result.push({name:key, index: index, values: obj[key]});
      index++;
    } 
    return result;
});

Template.App_memos.onCreated(function () {
	if(!Meteor.userId()){
		FlowRouter.go('/');
	}
	this.autorun(() => {
    var increment = 12;
		Session.setDefault('itemsLimit', increment);
    this.subscribe('memories.scrollList', Session.get('itemsLimit'));
 	});
});


Template.App_memos.helpers({
	memories(){
  		return Memories.find();
	},
	categories(){
    	return _.groupBy(Memories.find().fetch(), 'category');
	},
});

Template.App_memos.events({
	'click ._memoryModalShow': function(e) {
		var memoryModalStorage = {
			isDisabled: false
		};
		Session.set('memoryModalStorage', memoryModalStorage);
		$('#memoryModal').modal('show');
	},
	'click ._addWithCategory': function(e) {
		var memoryModalStorage = {
			category: e.currentTarget.attributes['data-category'].value,
			isDisabled: true
		};
		Session.set('memoryModalStorage', memoryModalStorage);
		$('#memoryModal').modal('show');
	},
	'click ._memoryDelete': function(e) {
		$('#memoryDeleteModal').modal('show');
		var memoryDeleteModalStorage = {
			_id: e.currentTarget.attributes['data-id'].value,
		};
		Session.set('memoryDeleteModalStorage', memoryDeleteModalStorage);
	},
	'click ._categoryDelete': function(e) {
		$('#categoryDeleteModal').modal('show');
		var categoryDeleteModalStorage = {
			category: e.currentTarget.attributes['data-category'].value,
		};
		Session.set('categoryDeleteModalStorage', categoryDeleteModalStorage);
	},
	'click ._memoryEdit': function(e) {
		var memoryEditModalStorage = {
			_id: e.currentTarget.attributes['data-id'].value,
			title: e.currentTarget.attributes['data-title'].value,
			memo: e.currentTarget.attributes['data-memo'].value,
			category: e.currentTarget.attributes['data-category'].value
		};
		Session.set('memoryEditModalStorage', memoryEditModalStorage);
		$('#memoryEditModal').modal('show'); }
	}
);

    
