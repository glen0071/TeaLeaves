Template.navigation.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });
  Template.navigation.helpers({
    userName:function(){
      return Meteor.user().emails[0].address;
    }
  });
