Template.dashboard.onCreated(function(){
  Meteor.subscribe("allUsersData");
  editUserMode = this.editUserMode = new ReactiveVar( false );
});

Template.dashboard.helpers({
    userCount: function(){
      return Meteor.users.find().count();
    },
    userList: function(){
      return Meteor.users.find({}, {sort: {createdAt: -1}});
    },
    editUserMode: function(){
      return Template.instance().editUserMode.get();
    }
});

Template.dashboard.events({
  'submit form':function(event, tpl){
    event.preventDefault();
    var varEmail = tpl.$('[name=email]').val();
    var varUsername = tpl.$('[name=username]').val();
    var varPassword = tpl.$('[name=password]').val();
    var varPoints = tpl.$('[name=points]').val();
    var varRole = tpl.$('[name=user-type]').val();
    Meteor.call('adminCreateUser', varEmail, varUsername, varPassword, varPoints, varRole)
  },
  'click [name=delete-user]': function(event, tpl){
    event.preventDefault()
    var userId = this._id;
    Meteor.call('deleteUser', userId)
  },
  'click [name=edit-user]': function(event, tpl){
    // event.preventDefault();
    var userId = this._id;
    console.log(userId);
    // editUserMode.toggle();
  }
});

Template.editUser.events({
  "submit form": function(event, tpl){
    event.preventDefault();
    var userId = this._id;
    var varEmail = tpl.$('[name=email]').val();
    var varUsername = tpl.$('[name=username]').val();
    var varPassword = tpl.$('[name=password]').val();
    var varPoints = tpl.$('[name=points]').val();
    var varRole = tpl.$('[name=user-type]').val();
    Meteor.call('adminEditUser', userId, varEmail, varUsername, varPassword, varPoints, varRole);
    Router.go("dashboard");
  }

});
