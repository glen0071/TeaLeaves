Template.leaderboard.onCreated(function(){
Meteor.subscribe("allUserData");
});

Template.leaderboard.helpers({
    leaders: function(){
      return Meteor.users.find({}, {sort: {points: -1}});
    },
});

Template.leaderboard.events({
  // 'click .profile-link': function(event) {
  //     event.preventDefault();
  //     console.log("message");
  //
  //     var user=this.createdBy;
  //
  //     Router.go('userProfile',{_id:user});
  //   },
});
