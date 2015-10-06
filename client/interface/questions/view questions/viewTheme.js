Template.viewTheme.onCreated(function () {
    this.subscribe('questions');
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
Template.viewTheme.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  }  
});
