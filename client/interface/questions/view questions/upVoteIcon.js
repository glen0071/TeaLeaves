Template.viewQuestions.onCreated(function () {
    this.voted = new ReactiveVar( false );
});

Template.upVoteIcon.helpers({
  voted: function(){
    var votersArray = this.upVoters;
    var currentUser = Meteor.userId();
    var filtered = votersArray.filter(function(voter){
      return (voter === currentUser)
    });
    if(filtered.length > 0) {
      return true
    }
  },

});

Template.upVoteIcon.events({
  'click [name=upVote]': function(event) {
    event.preventDefault();
    console.log('upvoted');
    currentQuestion = this._id;
    Meteor.call('newUpVote', currentQuestion);
  },
  'click [name=unVote]': function(event) {
    event.preventDefault();
    console.log('upvoted');
    currentQuestion = this._id;
    Meteor.call('removeVote', currentQuestion);
  },
});
