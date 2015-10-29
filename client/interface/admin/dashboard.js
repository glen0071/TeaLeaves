Template.dashboard.onCreated(function(){
Meteor.subscribe("allUsersData");
});

Template.dashboard.helpers({
    userList: function(){
      return Meteor.users.find();
    },
});

Template.dashboard.events({
  'submit form':function(event, tpl){
    event.preventDefault();
    var varEmail = tpl.$('[name=email]').val();
    var varUsername = tpl.$('[name=username]').val();
    var varPassword = tpl.$('[name=password]').val();
    var varPoints = tpl.$('[name=points]').val();
    var varRole = tpl.$('[name=user-type]').val();

    console.log('points: ' + varPoints);

    Accounts.createUser({
          email: varEmail,
          password: varPassword,
          username: varUsername,
          createdOn: new Date(),
          points: 0,
          roles: varRole,
          followingThemes: [],
          followingUsers: []
    },function(){
      var user = Meteor.userId();
      if(varRole==="admin"){
        Meteor.call('addAdmin', user, varPoints);
      } else {
        Meteor.call('addDefaultRole', user, varPoints);
      }
    });
  },
  'click [name=delete-user]': function(){
    var userId = this._id;
    console.log(userId);
    Meteor.call('deleteUser', userId)
  }
});
