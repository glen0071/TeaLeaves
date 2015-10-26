Template.viewQuestions.onCreated(function () {
  this.autorun(function(c){
    var filters=Session.get('filters');
     //console.log('filters: '+EJSON.stringify(filters, {indent: true}));
     if(filters){
       Pages.set({
              filters: filters}
            );
    }
  });
});

Template.viewQuestions.helpers({
  theme:function(){
    return Iron.controller().getParams().theme;
  },
  filters:function(){
    var filterz = Session.get('filters');
    return (_.pairs(_.omit(filterz,'closed')));
  }
});

Template.viewQuestions.events({
  "click [class=close]":function(event,template){
    Router.go('viewQuestions');
  },
      "change [name=showClosed]": function(event, template) {
        var btnValue = $('[name=showClosed]:checked').val();
        var filters = Session.get('filters');

        if (btnValue == 'on') {
          if(filters && filters.closed){
            delete filters.closed;
          }
        } else {
          filters.closed = {
            $ne: true
          };
        }
        Session.set('filters', filters);
      },
    "change [name=viewQsBtn]": function(event, template){
      var filters = Session.get('filters');
    var btnValue = $('[name=viewQsBtn]:checked').val();
      switch (btnValue) {
        case "1":
          Pages.set({
    sort: {createdOn: -1}
  });
          break;
        case "2":
          Pages.set({
    sort: {createdOn: 1}
  });
          break;
        case "3":
        $('[name=showClosed]:checked').prop('checked',false);
          Pages.set({
    sort: {deadline: 1} });
    filters.closed = {
      $ne: true
    };
    Session.set('filters', filters);
          break;
        case "4":
          Pages.set({
    sort: {answerCount: -1}
  });
          break;
        case "5":
          Pages.set({
    sort: {answerCount: 1}
  });
          break;
        case "6":
          Pages.set({
    sort: {upVotes: -1}
  });
          break;
      }
  },
});

Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  },

});
