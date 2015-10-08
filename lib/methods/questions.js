Meteor.methods({
  createNewQuestion: function(varHeadline, varText, varThemes, varDeadline) {
    var currentUser = Meteor.userId();
    var newQuestionData = {
      headline: varHeadline,
      text: varText,
      themes: varThemes,
      createdOn: new Date(),
      createdBy: currentUser,
      deadline:varDeadline,
      answers: []
    }
    return Questions.insert(newQuestionData);
  },
  voteYes: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: true, timestamp: new Date()}}})
  },
  voteNo: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: false, timestamp: new Date()}}})
  },
});
