Template.viewQuestions.onCreated(function () {
  this.filters = new ReactiveDict();
  this.filters.set("closed",{$ne: true});
  this.showClosed = new ReactiveVar(false);
  this.sorts = new ReactiveDict();
  this.sorts.set("createdOn",-1);
  this.filterText = new ReactiveVar('');
});

Template.viewQuestions.onRendered(function(){
this.autorun(function(c){
  var filtText = Template.instance().filterText.get();
  if(filtText && filtText!=""){
    Template.instance().filters.set("$or",[{headline:{$regex: filtText+".*", $options: "i"}},{text:{$regex: filtText+".*", $options: "i"}},{themes:{$regex: filtText+".*", $options: "i"}}]);
  }else{
    Template.instance().filters.delete("$or");
  }
});
  this.autorun(function(c){
    var filters=  Template.instance().filters.all();
     console.log('filters: '+EJSON.stringify(filters, {indent: true}));
     if(filters){
       Pages.set({
              filters: filters
            });
    }
    var sorts=  Template.instance().sorts.all();
     console.log('sorts: '+EJSON.stringify(sorts, {indent: true}));
     if(sorts){
       Pages.set({
              sort: sorts
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

Template.viewQuestions.helpers({
  theme:function(){
    return Iron.controller().getParams().theme;
  },
  filters:function(){
    var filterz = Template.instance().filters.all();
    var pairs = _.pairs(_.omit(filterz,'closed','adjudicatedOn','createdBy','$or'));
    return pairs;
  },
  hideFollowBtn:function() {
    var array =  Meteor.user().profile.followingThemes;
    var themeViewed = this[1];
    if ($.inArray(themeViewed, array) >= 0) {
        return "hideFollowBtn"
    } else {
      return ""
    }
  },
  currentRoute:function(){
    return Session.get("currentRoute");
  },
  showClosed: function() {
   return Template.instance().showClosed.get();
 },
 sortIcon:function(property){
   var sortDirection = Template.instance().sorts.all()[property];
   if(sortDirection === -1){
     return "glyphicon glyphicon-chevron-down";
   }else if (sortDirection === 1){
     return "glyphicon glyphicon-chevron-up";
   }
   return "glyphicon glyphicon-minus";
 }
});

Template.viewQuestions.events({

  'keyup #searchBox': function(event, template){
    var sc = Template.instance().filterText.set(event.target.value);
  },
  "click [class=close]":function(event,template){
    Router.go('viewQuestions');
  },
  "click [name=sortBtn]":function(event,template){
console.log("event target: "+event.target.id);
var prop;
switch(event.target.id){
  case "ageSortBtn":
    prop = "createdOn";
    break;
  case "deadlineSortBtn":
    prop = "deadline";
    break;
  case "answersSortBtn":
    prop = "answerCount";
    break;
  case "upvotesSortBtn":
    prop = "upVotes";
    break;
}

    if(template.sorts.equals(prop,undefined)){
      template.sorts.set(prop,-1);
    }else if(template.sorts.equals(prop,-1)){
      template.sorts.set(prop,1);
    }else{
      template.sorts.delete(prop);
    }
  },
  "change [name=showClosed]": function(event, template) {
       template.showClosed.toggle();
},
"click .collapse-link": function(event, template) {
  event.preventDefault();
}

//awaiting my adjudication - move to user profile?
    //         Pages.set({
    //   sort: {deadline: -1}
    // });
    // filters.closed = true;
    // filters.adjudicatedOn = {
    //   $exists:false
    // };
    // filters.createdBy = Meteor.userId();
});

Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  },
  'click .follow-theme': function(event, template){
    event.preventDefault();
    var themeViewed = this[1];
    console.log(themeViewed);
    var array =  Meteor.user().profile.followingThemes;
    console.log(array);
    Meteor.call('followTheme', themeViewed)
  },
  'click .unfollow-theme': function(event, template){
    event.preventDefault();
    var themeViewed = this[1];
    console.log(themeViewed);
    var array =  Meteor.user().profile.followingThemes;
    console.log(array);
    Meteor.call('unfollowTheme', themeViewed)
  }
});

Template.viewQuestion.helpers({
  relevantInfo:function(){
var bits = [];
      if (Template.instance().parentTemplate(4).sorts.equals("createdOn",undefined)===false) {
            var created=this.createdOn;
            var createdMoment = moment(created);
            var timeAgo = createdMoment.fromNow();
            bits.push("created "+timeAgo);
    }
    if (Template.instance().parentTemplate(4).sorts.equals("deadline",undefined)===false) {
            var deadline=this.deadline;
            var deadMoment = moment(deadline);
           var timeLeft = deadMoment.fromNow();
           var ended = deadMoment.isBefore(moment());
             if (ended){
               bits.push("ended "+timeLeft);
             }else{
               bits.push("ends "+timeLeft);
           }
    }
    if (Template.instance().parentTemplate(4).sorts.equals("answerCount",undefined)===false) {
      var answers = this.answers;
      bits.push(answers.length+" answers");
}
if (Template.instance().parentTemplate(4).sorts.equals("upVotes",undefined)===false) {
     var upvotes = this.upVotes;
      bits.push(upvotes+" upvotes");
}
    return bits.join(', ');
}
});
