Template.login.onRendered(function() {
var validator = $('.login').validate({
    submitHandler: function(event){
      var varEmail = $('[name=email]').val();
      var varPassword = $('[name=password]').val();
      Meteor.loginWithPassword(varEmail, varPassword,function(error) {
        if (error) {
            if (error.reason == "Incorrect password") {
              validator.showErrors({
                password: "Wrong password, please try again."
              });
            }else if (error.reason == "User not found") {
                validator.showErrors({
                  email: "No user found with that email address."
                });
              }else{
              console.log('Error: '+error.reason);
            }
          } else {
          Router.go("viewQuestions");
        }
    });
    }
});
});

Template.login.events({
  'submit form':function(event){
    event.preventDefault();
  },
  'click .btn-facebook': function(event){
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error){
          console.log(error.reason)
      }
    });
  },
  'click .btn-google': function(event){
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error){
      if (error) {
        console.log(error.reason);
      }
    });
  },
  'click .btn-twitter': function(event){
    Meteor.loginWithTwitter({
      if(error){
        console.log(error.reason);
      }
    });
  },
});
