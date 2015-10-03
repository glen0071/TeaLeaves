Questions = new Meteor.Collection('questions');

Meteor.methods({
  createNewQuestion: function(varHeadline, varText, varThemes,varDeadline) {
    var currentUser = Meteor.userId();
    var newQuestionData = {
      headline: varHeadline,
      text: varText,
      themes: varThemes,
      createdOn: new Date(),
      createdBy: currentUser,
      deadline:varDeadline
    }

    return Questions.insert(newQuestionData);
  }
})
