Meteor.startup(function () {
  // process.env.MAIL_URL = 'smtp://postmaster%40sandboxbab0cba908394430952999ae9eba16e4.mailgun.org:c8fd4d04f3cdb90e7733b0a224d41695@smtp.mailgun.org:587';
  process.env.MAIL_URL = 'smtp://postmaster%40tealeaves.co:51025bef39c5b12f959fab4e71c7b18e@smtp.mailgun.org:587';
});
  Accounts.emailTemplates.from = "support@tealeaves.co";
  Accounts.emailTemplates.sitename = "Tea Leaves";
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Please confirm your Email' ;
  },
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Click on the link below to verify your address: ' + url;
  },
  Accounts.config({
   sendVerificationEmail: true
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
  adminCreateUser:function(varEmail, varUsername, varPoints, varRole) {
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
  delete_current_user:function(currentUser){
    return Meteor.users.remove({_id: currentUser});
  }
});

Accounts.onCreateUser(function (options, user) {
    Roles.setRolesOnUserObj(user, ['default-user']);

    if (options.profile) {
      // include the user profile
      user.profile = options.profile
    }
    return user;
  });

Roles.setRolesOnUserObj = function (users, roles, group) {
  if (!users) throw new Error ("Missing 'users' param")
  if (!roles) throw new Error ("Missing 'roles' param")
  if (group) {
    if ('string' !== typeof group)
      throw new Error ("Roles error: Invalid parameter 'group'. Expected 'string' type")
    if ('$' === group[0])
      throw new Error ("Roles error: groups can not start with '$'")

    // convert any periods to underscores
    group = group.replace(/\./g, '_')
  }

  // ensure arrays to simplify code
  if (!_.isArray(users)) users = [users]
  if (!_.isArray(roles)) roles = [roles]


  // remove invalid roles
  roles = _.reduce(roles, function (memo, role) {
    if (role
        && 'string' === typeof role
        && role.trim().length > 0) {
      memo.push(role.trim())
    }
    return memo
  }, [])

  // if roles is empty, quit
  if (roles.length === 0) return

  // ensure all roles exist in 'roles' collection
  existingRoles = _.reduce(Meteor.roles.find({}).fetch(), function (memo, role) {
    memo[role.name] = true
    return memo
  }, {})
  _.each(roles, function (role) {
    if (!existingRoles[role]) {
      Roles.createRole(role)
    }
  })

  // ensure users is an array of objects
  _.each(users, function (user) {
    if ('object' !== typeof user) {
      throw new Error("Expected 'users' argument to be an object or array of objects")
    }
  })


  // Set the roles on the actual user object

  if (group) {

    // roles is a key/value dict object

    _.each(users, function (user) {
      user.roles = {}
      user.roles[group] = roles
    })

  } else {

    // roles is an array of strings

    _.each(users, function (user) {
      user.roles = roles
    })

  }

}  // end setRolesOnUserObj
