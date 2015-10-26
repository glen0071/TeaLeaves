Meteor.methods({
  updateProfile:function(newUserName, newAboutMe, newName){
    var currentUser = Meteor.userId();
    Meteor.users.update(
      {_id: currentUser},
      {$set:
        {
          username: newUserName,
          "profile.aboutme": newAboutMe,
          "profile.name": newName
        }
      });
  }
});
