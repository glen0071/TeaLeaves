Meteor.methods({
  addDefaultRole:function(user, varPoints){
    Roles.addUsersToRoles(user, ['default-user']);
    Meteor.users.update({_id: user}, {$set: {points: varPoints}});
    return user;
  },
  addAdmin:function(user, varPoints){
    Roles.addUsersToRoles(user, ['admin']);
    Meteor.users.update({_id: user}, {$set: {points: varPoints}});
    return user;
  },
  deleteUser:function(userId){
    return Meteor.users.remove({_id: userId});
  },
  adminCreateUser:function(varEmail, varUsername, varPassword, varPoints, varRole) {
    var newUserData = {
      email: varEmail,
      username: varUsername,
      password: varPassword,
      points: varPoints,
      roles: varRole,
      createdAt: new Date(),
      followingThemes: [],
      followingUsers: []
    }
    return Meteor.users.insert(newUserData);
  },
  adminEditUser:function(userId, varEmail, varUsername, varPassword, varPoints, varRole){
    var editedData = {
      email: varEmail,
      username: varUsername,
      password: varPassword,
      points: varPoints,
      roles: varRole,
    }
    return Meteor.users.update({_id: userId }, {$set: editedData})
  }
});
