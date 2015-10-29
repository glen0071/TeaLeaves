Template.leaderboard.onCreated(function(){
Meteor.subscribe("allUserData");
});

Template.leaderboard.helpers({
    test: [
      {name: "one"},
      {name: "one"},
      {name: "one"},
    ],
    leaders: function(){
      return Meteor.users.find({}, {poitns: -1});
    },
});
