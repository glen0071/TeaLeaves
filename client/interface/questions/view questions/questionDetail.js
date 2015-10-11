Template.questionDetail.onCreated(function () {
    this.subscribe('questions');
});

Template.questionDetail.helpers({
  questions: function(){
    return Questions.find();
  },
  userName:function(){
    var user=this.createdBy;
    return Meteor.users.findOne({_id:user}).emails[0].address;
  },
  createdOnString:function(){
    var created=this.createdOn;
    return moment(created).format("dddd, MMMM D, YYYY, h:mm a");
  },
  deadlineString:function(){
    var dead=this.deadline;
    var deadMoment = moment(dead);
    var timeLeft = deadMoment.fromNow();
    var deadString = deadMoment.format("dddd, MMMM D, YYYY, h:mm a")+" ("+timeLeft+")" ;
    return deadString;
  },
  answerStatus:function(){
    Session.get('unanswered');
  },
  unanswered:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return (object.userId === currentUser)
    });
    if(filtered.length === 0) {
      return true
    }
  },
  answered:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return (object.userId === currentUser)
    });
    if(filtered.length > 0) {
      return true
    }
  },
  answeredYes:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if(filtered.length > 0) {
      return true
    }
  },
  answeredNo:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if(filtered.length > 0) {
      return true
    }
  },
  votedYes:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if(filtered.length == 1) {
      return "disabled"
    }
  },
  votedNo:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if(filtered.length == 1) {
      return "disabled"
    }
  }
});

Template.questionDetail.events({
    'click .theme-link': function(event) {
      event.preventDefault();
      var theTheme = event.target.text;
      Router.go('viewTheme',{theme:theTheme});
    },
    'click #newVoteYes': function(event) {
      event.preventDefault();
      currentQuestion = this._id;
      Meteor.call('newVoteYes', currentQuestion);
    },
    'click #newVoteNo': function(event) {
      event.preventDefault();
      currentQuestion = this._id;
      Meteor.call('newVoteNo', currentQuestion);
    },
    'click #changeVoteYes': function(event) {
      event.preventDefault();
      currentQuestion = this._id;
      Meteor.call('changeVoteYes', currentQuestion);
    },
    'click #changeVoteNo': function(event) {
      event.preventDefault();
      currentQuestion = this._id;
      Meteor.call('changeVoteNo', currentQuestion);
    },
    'click #revoteYes': function(event) {
      event.preventDefault();
      alert("you already voted Yes");
    },
    'click #revoteNo': function(event) {
      event.preventDefault();
      alert("you already voted No");
    }
  });
