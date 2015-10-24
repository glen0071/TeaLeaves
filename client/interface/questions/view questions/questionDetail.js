Template.questionDetail.helpers({
  questions: function(){
    return Questions.find();
  },
  userName:function(){
    var user = Meteor.users.findOne({_id:this.createdBy});
    return user.username ? user.username : user.emails[0].address;

  },
  createdOnString:function(){
    var created=this.createdOn;
    return moment(created).format("dddd, MMMM D, YYYY, h:mm a");
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
  'click .profile-link': function(event) {
      event.preventDefault();
      var user=this.createdBy;
      Router.go('userProfile',{_id:user});
    },
});
