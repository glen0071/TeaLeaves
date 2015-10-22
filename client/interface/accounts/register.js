Template.register.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEmail = $('[name=email]').val();
    var varUsername = $('[name=username]').val();
    var varPassword = $('[name=password]').val();
    Accounts.createUser({
      email: varEmail,
      password: varPassword,
      username: varUsername,
      createdOn: new Date(),
      points: 0,
      followingThemes: [],
      followingUsers: []
    });
    Meteor.loginWithPassword(varEmail, varPassword);
    Router.go("viewQuestions");
  }
});
