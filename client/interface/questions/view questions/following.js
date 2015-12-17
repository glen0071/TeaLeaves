Template.following.onCreated(function () {
  this.autorun(function(c){
    var filters=Session.get('filters');
     if(filters){
     Pages.set({
            filters: filters
          });
        }
  });
this.subscribe('questions', {limit: 100});
this.subscribe('allUsersData', {limit: 100}); // needs to be limited more precisely
});

Template.following.helpers({
  followedUserQuestions: function() {
    var themesArray = Meteor.user().profile.followingThemes;
    var usernamesArray = Meteor.user().profile.followingUsers;
    var idsArray = usernamesArray.map(function(obj){
      return userIds = Meteor.users.findOne({"username": obj})._id;
    });
    return Questions.find({
      $or: [
            {createdBy: {$in: idsArray}},
            {themes: {$in: themesArray}}
      ]
    });
  },
});


// don't show closed
// add infinite scrolling
