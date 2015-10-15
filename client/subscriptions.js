Meteor.autosubscribe(function() {
     Meteor.subscribe("creatorData",
     Session.get('current_question'));
});
