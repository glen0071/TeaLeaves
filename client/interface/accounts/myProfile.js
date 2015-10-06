// A user can view and edit his profile from here
Template.myProfile.onCreated(function () {
    this.subscribe('questions');
    // limit to questions user created or answered
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
  questionsUserAnswered: function(){
    var currentUser = Meteor.userId();
    return Questions.find({answeredBy: currentUser});
  }
});

Template.myProfile.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEditTopics = $('[editTopics]').val();
  }
});
