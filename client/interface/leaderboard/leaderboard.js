Template.leaderboard.onCreated(function(){
Meteor.subscribe("allUserData");
});

Template.leaderboard.helpers({
    leaders: function(){
      return Meteor.users.find({}, {sort: {points: -1}});
    },
});
