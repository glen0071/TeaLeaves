Template.voting.helpers({
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


Template.votingSmall.helpers({
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
      return "disabled grayed"
    } else {
      return "btn-success"
    }
  },
  votedNo:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if(filtered.length == 1) {
      return "disabled grayed"
    } else {
      return "btn-danger"
    }
  }
});

Template.viewQuestion.events({
    'click .theme-link': function(event) {
      event.preventDefault();
      var theTheme = event.target.text;
      Router.go('viewTheme',{theme:theTheme});
    },
    'click #newVoteYes': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('newVoteYes', currentQuestion);
      }
    },
    'click #newVoteNo': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('newVoteNo', currentQuestion);
      }
    },
    'click #changeVoteYes': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('changeVoteYes', currentQuestion);
      }
    },
    'click #changeVoteNo': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('changeVoteNo', currentQuestion);
      }
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
