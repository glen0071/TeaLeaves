Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1,'points':1}});
});

Meteor.publish("userData", function (currentUser) {
    return Meteor.users.find({_id: currentUser},
        {fields: {'emails':1,'points':1}});
});

Meteor.publish("creatorData", function (currentQuestion) {
  var questionDoc = Questions.findOne(currentQuestion);
    return Meteor.users.find({_id: questionDoc.createdBy},
        {fields: {'emails':1}});
});

Meteor.publish("answererData", function (currentQuestion) {
  // console.log("publishing answererData");
  var questionDoc = Questions.findOne(currentQuestion);
  var answersArray = questionDoc.answers;
  // console.log(answersArray.length +"people answered");

  var answerersArray=[];
  answersArray.forEach(function (item, index, array) {
//    console.log(item.userId+' answered.');
    answerersArray.push(item.userId);
  });
    return Meteor.users.find({_id: {$in:answerersArray}},
        {fields: {'points':1}});
});
