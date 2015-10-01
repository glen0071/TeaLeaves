Template.viewQuestions.helpers({
  questions: function(){
    return Questions.find();
  }
});

Template.viewQuestions.onCreated(function () {
    this.subscribe('questions');
});
