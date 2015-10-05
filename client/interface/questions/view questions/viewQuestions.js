Template.viewQuestions.onCreated(function () {
    this.subscribe('questions');
});

Template.viewQuestions.helpers({
  questions: function(){
    return Questions.find({}, {sort: {createdOn: -1}});
  }
});

Template.viewQuestions.events({
  "change [name=trendQuestionsBtn]": function(event, template){
    console.log('test1');
  },
  "change [name=recentQuestionsBtn]": function(event, template){
    console.log('test2');
  },
  "change [name=closeSoonQuestionsBtn]": function(event, template){
    console.log('test3');
  },
  "change [name=topRatedQuestionsBtn]": function(event, template){
    console.log('test4');
  }
});
