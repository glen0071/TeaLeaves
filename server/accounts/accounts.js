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
  }
});
