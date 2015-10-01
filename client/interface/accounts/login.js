Template.register.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEmail = $('[name=email]').val();
    var varPassword = $('[name=password]').val();
    Meteor.loginWithPassword(varEmail, varPassword);
  }
});
