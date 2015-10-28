Meteor.methods({
  addDefaultRole:function(user){
    Roles.addUsersToRoles(user, ['default-user']);
    return user;
  }
});
