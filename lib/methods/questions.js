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
  adjudicate: function(answer, currentQuestion) {
    var currentUser = Meteor.userId();
    var currentQuestionDoc = Questions.findOne(currentQuestion);
    if (currentQuestionDoc.createdBy == currentUser){
      return Questions.update({_id: currentQuestion}, {$set: {correctAnswer: answer, adjudicatedOn: new Date()}})
    }else{
      console.log("error: user is not owner of question");
    }
  }
});
