Meteor.autorun(function () {
    Meteor.subscribe("userData",
    Meteor.userId());
  });
