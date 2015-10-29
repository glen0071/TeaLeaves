
if(Meteor.users.find().count()===0)
  Accounts.createUser(
    {
      createdAt: new Date(),
      username: "admin",
      password: "secret",
      email: "admin@admin.com",
      role: "admin",
      points: 150
    },
  )

if(Meteor.users.find().count()===1){
  var user = Meteor.users.findOne();
  var userId = user._id;
  Roles.addUsersToRoles(userId, ['admin']);
}
