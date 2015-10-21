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
