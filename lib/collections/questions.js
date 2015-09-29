Questions = new Meteor.Collection('questions');

Meteor.methods({
  createNewQuestion: function(varHeadline, varText, varThemes) {
    var currentUser = Meteor.userId();
    var newQuestionData = {
      headline: varHeadline,
      text: varText,
      themes: varThemes,
      createdOn: new Date(),
      createdBy: currentUser
    }
    Questions.insert(newQuestionData);

  }
})
