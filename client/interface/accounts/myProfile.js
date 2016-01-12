// A user can view and edit his profile from here
Template.myProfile.onCreated(function() {
  this.subscribe('questions', {
    limit: 100
  });
  this.editProfileMode = new ReactiveVar(false);
  this.editingPassword = new ReactiveVar(false);
  this.editingEmail = new ReactiveVar(false);
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
    return Meteor.user().profile.followingThemes;
  },
  usersFollowed: function() {
    return Meteor.user().profile.followingUsers;
  },
  editingPassword: function() {
    return Template.instance().editingPassword.get();
  },
  editingEmail: function() {
    return Template.instance().editingEmail.get();
  }
});

Template.myProfile.events({
  'click #edit-profile-link': function(event, template) {
    event.preventDefault();
    template.editProfileMode.set(true);
  },
  'click #save-profile-link': function(event, template) {
    event.preventDefault();
    var newUserName = $('[name=username]').val();
    var newAboutMe = $('[name=aboutme]').val();
    var newName = $('[name=name]').val();
    var newEmail = $('[name=email]')
    Meteor.call('updateProfile', newUserName, newAboutMe, newName, newEmail)
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
  'click #edit-email': function(event, template) {
    event.preventDefault();
    console.log("edit Email mode");
    template.editingEmail.set(true);
  },
  'click #save-new-email': function(event, template) {
    event.preventDefault();
    var updatedEmail = template.$('[name=newEmail]').val();

    Meteor.call("userChangeEmail", updatedEmail, function(error, result){
      if(error){
        console.log("error", error);
        return false
      } else {
        console.log("Your new email has been updated, and an email has been sent to that address to confirm it.");
        template.editingEmail.set(false);
      }

    });
  },
  'click #cancel-edit-email': function(event, template) {
    event.preventDefault();
    template.editingEmail.set(false);
  },
  'click #edit-password-module': function(event, template) {
    event.preventDefault();
    console.log("edit password");
    template.editingPassword.set(true);
  },
  'click #update-password': function(event, template) {
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
  'click #cancel-change': function(event, template) {
    event.preventDefault();
    console.log("cancel save password");
    template.editingPassword.set(false);
  },
  'click .themes-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  },
  'click .profile-link': function(event) {
      event.preventDefault();
      var user=this;
      Router.go('userProfile',{_id:user});
  },
});
