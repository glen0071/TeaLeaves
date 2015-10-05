Template.search.onCreated(function () {
    this.subscribe('questions');
});

Template.search.helpers({
  searchQuestions: function(){
    return Questions.find()
  }
});
