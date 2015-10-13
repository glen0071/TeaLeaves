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
  newVoteYes: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: true, votedOn: new Date()}}})
  },
  newVoteNo: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: false, votedOn: new Date()}}})
  },
  changeVoteYes: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion, answers:
      {$elemMatch:
        {userId: currentUser}
      }
    },
      {$set:
        {
          "answers.$.answer" : true,
          "answers.$.votedOn" : new Date()
        }
      }
    )
  },
  changeVoteNo: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion, answers:
      {$elemMatch:
        {userId: currentUser}
      }
    },
      {$set:
        {
          "answers.$.answer" : false,
          "answers.$.votedOn" : new Date()
        }
      }
    )
  },
  // don't forget to add in time stamp
});
