// A user can view and edit his profile from here
Template.myProfile.onCreated(function () {
    this.subscribe('questions', {limit: 100});
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
  email: function(){
    return Meteor.user().emails[0].address;
  },
  aboutMe: function() {
    return Meteor.user().aboutMe;
  }
});

Template.myProfile.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEditTopics = $('[editTopics]').val();
  }
});
