// A user can view and edit his profile from here
Template.myProfile.onCreated(function() {
  this.subscribe('questions', {
    limit: 100
  });
  this.editProfileMode = new ReactiveVar(false);
  this.editingPassword = new ReactiveVar(false);
});

Template.myProfile.helpers({
  questionsAsked: function() {
    var currentUser = Meteor.userId();
    return Questions.find({
      createdBy: currentUser
    }).count();
  },
  questionsUserAsked: function() {
    var currentUser = Meteor.userId();
    return Questions.find({
      createdBy: currentUser
    });
  },
  questionsAnswered: function() {
    var currentUser = Meteor.userId();
    return Questions.find({
      "answers.userId": currentUser
    }).count();
  },
  questionsUserAnswered: function() {
    var currentUser = Meteor.userId();
    return Questions.find({
      "answers.userId": currentUser
    });
  },
  userName: function() {
    return Meteor.user().username ? Meteor.user().username : '';
  },
  aboutMe: function() {
    return Meteor.user().profile['aboutme'];
  },
  editProfileMode: function() {
    return Template.instance().editProfileMode.get();
  },
  name: function() {
    return Meteor.user().profile['name'];
  },
  themesFollowed: function() {
    return Meteor.user().profile.followingThemes.join(', ');
  },
  usersFollowed: function() {
    return Meteor.user().profile.followingUsers.join(', ');
  },
  editingPassword: function() {
    return Template.instance().editingPassword.get();
  }
});

Template.myProfile.events({
  'click #edit-profile-link': function(event, template) {
    event.preventDefault();
    template.editProfileMode.set(true);
  },
  'submit form': function(event, template) {
    event.preventDefault();
    var newUserName = $('[name=username]').val();
    var newAboutMe = $('[name=aboutme]').val();
    var newName = $('[name=name]').val();
    Meteor.call('updateProfile', newUserName, newAboutMe, newName)
    template.editProfileMode.set(false);
  },
  'click #cancel-changes': function(event, template) {
    template.editProfileMode.set(false);
  },
  'click #delete-account': function(event, template) {
    event.preventDefault();
    console.log("test");
    var dont_go = confirm("Are you sure you'd like to delete your account?");
    if (dont_go) {
      var currentUser = Meteor.userId();
      Meteor.call('delete_current_user', currentUser)
        // automatically goes to viewQuestions page already
    }
  },
  'click #add-email': function(event,template){
    event.preventDefault();
    console.log("message");

  },
  'click #edit-password-module': function(event,template){
    event.preventDefault();
    console.log("edit password");
    template.editingPassword.set(true);
  },
  'click #update-password': function(event,template){
    event.preventDefault();
    var oldPassword = $('[name=currentPassword]').val();
    var newPassword = $('[name=confirmPassword]').val();
    var confirmPassword = $('[name=confirmPassword]').val();
    console.log(oldPassword + "  " + newPassword + " " + confirmPassword);
    if (newPassword !== confirmPassword) {
            alert("passwords don't match")
            return false;
        }
    Accounts.changePassword(oldPassword, newPassword, function(error) {
            if (error) {
                console.log('There was an issue: ' + error.reason);
            } else {
                console.log('You reset your password!');
            }
    });
  },
  'click #cancel-change': function(event,template){
    event.preventDefault();
    console.log("cancel save password");
    template.editingPassword.set(false);
  },
  //   Meteor.call("userAddEmail", dataObject, function(error, result){
  //     if(error){
  //       console.log("error", error);
  //     }
  //     if(result){
  //
  //     }
  //   });
  //


});
