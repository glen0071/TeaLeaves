Template.forgotPassword.events({



  "click [name=recoverPassword]": function(event, template){
      var emailVar = $('[name=emailAddress]').val();
      // check if emailVar is in dataBase

    Meteor.call('resetPasswordEmail')
  }
});
