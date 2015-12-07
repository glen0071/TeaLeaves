Meteor.methods({
  updateProfile:function(newUserName, newAboutMe, newName){
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$set:
        {
          username: newUserName,
          "profile.aboutme": newAboutMe,
        }
      });
  },
  userChangeEmail:function(updatedEmail){
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$set:
        {
          'emails.0.address': updatedEmail,
          'emails.0.verified': false
        }
      });
  },
  followUser:function(username) {
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$addToSet: {"profile.followingUsers": username}});
  },
  unfollowUser:function(username) {
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$pullAll: {"profile.followingUsers": [username]}});
  },
  followTheme:function(themeViewed) {
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$addToSet: {"profile.followingThemes": themeViewed}}
    );
  },
  unfollowTheme:function(themeViewed) {
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$pullAll: {"profile.followingThemes": [themeViewed]}}
    );
  },
});
