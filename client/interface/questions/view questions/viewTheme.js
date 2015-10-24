Template.viewTheme.onCreated(function () {
    this.subscribe('questions', {limit: 10});
});

Template.viewTheme.helpers({
  theme:function(){
    return Iron.controller().getParams().theme;
  },
  questions: function(){
    var theTheme = Iron.controller().getParams().theme;
    //console.log('theTheme: '+theTheme);
    return Questions.find({themes:theTheme}, {sort: {createdOn: -1}});
  }
});
