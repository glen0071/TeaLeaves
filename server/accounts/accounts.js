Meteor.methods({
  addDefaultRole:function(user){
    Roles.addUsersToRoles(user, ['default-user']);
    return user;
  },
  addAdmin:function(user){
    Roles.addUsersToRoles(user, ['admin']);
    return user;
  },
  deleteUser:function(userId){
    return Meteor.users.remove({_id: userId});
  }
});
