Meteor.autorun(function () {
    Meteor.subscribe("creatorData",
    Session.get('current_question'));
    Meteor.subscribe("answererData",
    Session.get('current_question'));
    Meteor.subscribe("userData",
    Meteor.userId());
  });
