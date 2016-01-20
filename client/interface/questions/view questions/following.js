Template.following.onCreated(function () {
this.subscribe('questions', {limit: 100});
this.subscribe('allUsersData', {limit: 100}); // needs to be limited more precisely
});

Template.following.onRendered(function(){
  var themesArray = Meteor.user().profile.followingThemes;
  var usernamesArray = Meteor.user().profile.followingUsers ? Meteor.user().profile.followingUsers : [] ;
  var idsArray = usernamesArray.map(function(obj){
    return userIds = Meteor.users.findOne({"username": obj})._id;
  });
  InfiniteFollowing.set({
         filters: {$or: [
               {createdBy: {$in: idsArray}},
               {themes: {$in: themesArray}}
         ], closed: {$ne:true}}
       });
});

Template.following.helpers({
followingCount: function() {
  usersFollowed = Meteor.user().profile.followingUsers;
    usersFollowedLength = usersFollowed ?usersFollowed.length : 0;
    themesFollowed = Meteor.user().profile.followingThemes;
      themesFollowedLength = themesFollowed ?themesFollowed.length: 0;
    if (usersFollowedLength + themesFollowedLength == 0) {
      return false;
    } else {
        return true;
    }
  }
});
