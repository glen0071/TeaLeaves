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
      answers: [],
      answerCount: 0,
      upVotes: 0,
      upVoters: []
    }
    return Questions.insert(newQuestionData);
  },
  newVoteYes: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: true, votedOn: new Date()}}, $inc: {answerCount: 1}})
  },
  newVoteNo: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$push: {answers: {userId: currentUser, answer: false, votedOn: new Date()}}, $inc: {answerCount: 1}})
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
  adjudicate: function(answer, reason, currentQuestion) {
    var currentUser = Meteor.userId();
    var currentQuestionDoc = Questions.findOne(currentQuestion);
    if (currentQuestionDoc.createdBy == currentUser){
      return Questions.update({_id: currentQuestion}, {$set: {correctAnswer: answer, reasoning: reason, adjudicatedOn: new Date()}})
    }else{
      console.log("error: user is not owner of question");
    }
  },
  awardPoints: function(currentQuestion) {
    var currentQuestionDoc = Questions.findOne(currentQuestion);
    var currentQuestionCorrectAnswer = currentQuestionDoc.correctAnswer;
  //  console.log("currentQuestionCorrectAnswer: "+currentQuestionCorrectAnswer);
    var answersArray = currentQuestionDoc.answers;
  //  console.log("currentQuestionDoc: "+currentQuestionDoc._id);
  //  console.log("answersArray: "+answersArray);
    answersArray.forEach(function (item, index, array) {
      var thisUser = item.userId;
      var thisAnswer = item.answer;
  //    console.log(thisUser+' answered '+thisAnswer);
      if(thisAnswer ==currentQuestionCorrectAnswer){
        Meteor.users.update({_id: thisUser}, {$inc: {points: 1}});
      }
    });
  },
  newUpVote: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$inc: {upVotes: 1}, $push: {upVoters: currentUser}})
  },
  removeVote: function(currentQuestion) {
    var currentUser = Meteor.userId();
    return Questions.update({_id: currentQuestion}, {$inc: {upVotes: -1}, $pull: {upVoters: currentUser}})
  },
  closeQuestion: function(currentQuestion){
    return Questions.update({_id: currentQuestion}, {$set: {closed: true}});
  }
});
