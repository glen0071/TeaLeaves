Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster%40sandboxbab0cba908394430952999ae9eba16e4.mailgun.org:c8fd4d04f3cdb90e7733b0a224d41695@smtp.mailgun.org:587';
});
  Accounts.emailTemplates.from = "no-reply@guess.com";
  Accounts.emailTemplates.sitename = "Guess";
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Please confirm your Email' ;
  },
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Click on the link below to verify your address: ' + url;
  },
  Accounts.config({
   sendVerificationEmail: false
 });


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
  adminEditUser:function(userId, varUsername, varPassword, varPoints, varRole){
    var editedData = {
      username: varUsername,
      password: varPassword,
      points: varPoints,
      roles: varRole,
    }
    return Meteor.users.update({_id: userId}, {$set: editedData})
  },
  // changeEmail:function(userId, newEmail){
  //   return Meteor.users.update({_id: userId}, {$set: {points: 50}});
  //
  // }
});
