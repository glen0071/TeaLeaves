Template.dashboard.onCreated(function(){
  Meteor.subscribe("allUsersData");
  editUserMode = this.editUserMode = new ReactiveVar( false );
});

Template.editUser.onCreated(function(){
  // Meteor.subscribe("allUserData");
  editEmailMode = this.editEmailMode = new ReactiveVar( false );
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
    // editUserMode.toggle();
  }
});

Template.oneUser.helpers({
  userEmail: function(){
    return this.emails[0].address;
  },
  joinDate: function(){
    var join = this.createdAt;
    var joinMoment = moment(join);
    var joinString = joinMoment.format('MMM Do YY');
    return joinString;
  }
});


// var dead=this.deadline;
// var deadMoment = moment(dead);
// var timeLeft = deadMoment.fromNow();
// var deadString = deadMoment.format("dddd, MMMM D, YYYY, h:mm a")+" ("+timeLeft+")" ;
// return deadString;

Template.editUser.helpers({
  userEmail: function(){
    return this.emails[0].address;
  },
  editEmailMode: function(){
    return Template.instance().editEmailMode.get();
  }
});

Template.editUser.events({
  "submit form": function(event, tpl){
    event.preventDefault();
    var userId = this._id;
    console.log(userId);
    var varUsername = tpl.$('[name=username]').val();
    var varPassword = tpl.$('[name=password]').val();
    var varPoints = parseInt(tpl.$('[name=points]').val());
    var varRole = tpl.$('[name=user-type]').val();
    Meteor.call('adminEditUser', userId, varUsername, varPassword, varPoints, varRole);
    Router.go("dashboard");
  },
  "click [name=editEmail]": function(event, tpl){
    event.preventDefault();
    editEmailMode.toggle();
  }
});

// Template.adminEditEmail.helpers({
//   userEmail: function(){
//     return this.emails[0].address;
//   }
// });

// Template.adminEditEmail.events({
//   "click [name=save]": function(event, tpl){
//     event.preventDefault();
//     console.log(this._id);
//     console.log('test');
//     var userId = this._id;
//     var newEmail = tpl.$('[name=userEmail]').val();
//     Meteor.call("changeEmail", userId, newEmail);
//   },
//   "click [name=cancel]": function(event, tpl){
//     event.preventDefault();
//     editEmailMode.toggle();
//   },
// });
