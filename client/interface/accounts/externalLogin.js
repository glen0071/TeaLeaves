Template.externalLogin.events({
  'click .btn-facebook': function(event){
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error){
          console.log(error.reason)
      }else{
        Router.go("viewQuestions");
      }
    });
  },
  'click .btn-google': function(event){
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error){
      if (error) {
        console.log(error.reason);
      }else{
        Router.go("viewQuestions");
      }
    });
  },
  'click .btn-twitter': function(event){
    Meteor.loginWithTwitter({},function(error){
      if(error){
        console.log(error.reason);
      }else{
        Router.go("viewQuestions");
      }
    });
  },
});
