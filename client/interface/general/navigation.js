Template.navigation.onCreated(function(){
//Meteor.subscribe("userData");
});

Template.navigation.helpers({
  userName:function(){
    return Meteor.user().username;
  },
  points:function () {
    return Meteor.user().points ? Meteor.user().points : 0 ;
  }
});

Template.navigation.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout(function(error){
        if(error){
          console.log("error logging out: "+error);
        }
      });
      Router.go('viewQuestions');
    },
    'click .my-profile-link': function(event) {
        event.preventDefault();
        var user=Meteor.userId();
        Router.go('myProfile',{_id:user});
    }
});
