Template.viewQuestions.onCreated(function () {
  this.filters = new ReactiveDict();
  this.filters.set("closed",{$ne: true});
  this.showClosed = new ReactiveVar(false);

});

Template.viewQuestions.onRendered(function(){
  this.autorun(function(c){
    var filters=  Template.instance().filters.all();
     console.log('filters: '+EJSON.stringify(filters, {indent: true}));
     if(filters){
       Pages.set({
              filters: filters
            });
    }
  });
  this.autorun(function(c){
    var sc = Template.instance().showClosed.get();
  //  console.log("showclosed: "+sc);
    var currentRoute = Session.get('currentRoute');
    if(sc === false){
      Template.instance().filters.set("closed", {$ne:true});
    }else{
      Template.instance().filters.delete("closed");
    }
    if(currentRoute == 'viewTheme'){
      var theTheme = Iron.controller().getParams().theme;
      Template.instance().filters.set("themes",theTheme);
    }else{
      Template.instance().filters.delete("themes");
    }
  });

});

Template.viewQuestions.onDestroyed(function(){
Pages.set({
  sort: {createdOn: -1} });
});

Template.viewQuestions.helpers({
  theme:function(){
    return Iron.controller().getParams().theme;
  },
  filters:function(){
    var filterz = Template.instance().filters.all();
    var pairs = _.pairs(_.omit(filterz,'closed','adjudicatedOn','createdBy'));
    return pairs;
  },
  currentRoute:function(){
    return Session.get("currentRoute");
  },
  showClosed: function() {
   return Template.instance().showClosed.get();
 }
});

Template.viewQuestions.events({
  "click [class=close]":function(event,template){
    Router.go('viewQuestions');
  },
       "change [name=showClosed]": function(event, template) {
      // //  var btnValue = $('[name=showClosed]:checked').val();
      //   var filters = Template.instance().filters.get();
         template.showClosed.toggle();
      },
    "change [name=viewQsBtn]": function(event, template){
      var filters = Template.instance().filters.get();
      $('[name=showClosed]').prop('disabled',false);
      delete filters.adjudicatedOn;
      delete filters.createdBy;

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
        $('[name=showClosed]').prop('checked',false);
        $('[name=showClosed]').prop('disabled',true);
          Pages.set({
    sort: {deadline: 1} });
    filters.closed = {
      $ne: true
    };
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
          case "7":
            Pages.set({
      sort: {deadline: -1}
    });
    filters.closed = true;
    filters.adjudicatedOn = {
      $exists:false
    };
    filters.createdBy = Meteor.userId();
    $('[name=showClosed]').prop('checked',true);
    $('[name=showClosed]').prop('disabled',true);
            break;
      }
      template.filters.set(filters);

  },
});

Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  },

});

Template.viewQuestion.helpers({
  relevantInfo:function(){
    var btnValue = $('[name=viewQsBtn]:checked').val();
      if (btnValue==1 || btnValue ==2 || btnValue == null) {
            var created=this.createdOn;
            var createdMoment = moment(created);
            var timeAgo = createdMoment.fromNow();
            return "created "+timeAgo;
    }else if (btnValue == 3 || btnValue == 7){
        var deadline=this.deadline;
        var deadMoment = moment(deadline);
        var timeLeft = deadMoment.fromNow();
        var ended = deadMoment.isBefore(moment());
        if (ended){
          return "ended "+timeLeft;
        }else{
          return "ends "+timeLeft;
        }
    }else if (btnValue == 4 || btnValue == 5){
      var answers = this.answers;
      return answers.length+" answers"
    }else if (btnValue == 6){
      var upvotes = this.upVotes;
      return upvotes+" upvotes"
    }else {
    return "";
  }
}
});
