Template.register.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEmail = $('[name=email]').val();
    var varPassword = $('[name=password]').val();
    Accounts.createUser({
      email: varEmail,
      password: varPassword,
      createdOn: new Date(),
      score: 0,
      followingThemes: [],
      followingUsers: []
    });
  }
});
