Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1,'points':1}});
});

Meteor.publish("creatorData", function (currentQuestion) {
  var questionDoc = Questions.findOne(currentQuestion);
    return Meteor.users.find({_id: questionDoc.createdBy},
        {fields: {'emails':1,'points':1}});
});
