Meteor.publish('questions', function(options) {
  check(options, {
    limit: Number
  });
  return Questions.find({}, options);
});

Meteor.publish('questionData',function(question){
  return Questions.find({_id:question});
});
