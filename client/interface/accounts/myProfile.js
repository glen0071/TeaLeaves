// A user can view and edit his profile from here
Template.myProfile.onCreated(function () {
    this.subscribe('questions', {limit: 100});
    this.editProfileMode = new ReactiveVar( false );
});

Template.myProfile.helpers({
  questionsAsked: function(){
    var currentUser = Meteor.userId();
    return Questions.find({createdBy: currentUser}).count();
  },
  questionsUserAsked: function(){
    var currentUser = Meteor.userId();
    return Questions.find({createdBy: currentUser});
  },
  questionsAnswered: function(){
    var currentUser = Meteor.userId();
    return Questions.find({"answers.userId": currentUser}).count();
  },
  questionsUserAnswered: function(){
    var currentUser = Meteor.userId();
    return Questions.find({"answers.userId": currentUser});
  },
  userName: function(){
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
});

Template.myProfile.events({
  'click #edit-profile-link': function(event, template){
      event.preventDefault();
      template.editProfileMode.set( true );
  },
  'submit form': function(event, template){
      event.preventDefault();
      var newUserName = $('[name=username]').val();
      var newAboutMe = $('[name=aboutme]').val();
      var newName = $('[name=name]').val();
      Meteor.call('updateProfile', newUserName, newAboutMe, newName)

      template.editProfileMode.set( false );
  }
});
