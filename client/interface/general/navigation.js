
Template.navigation.helpers({
  userName:function(){
    return Meteor.user().username ? Meteor.user().username : Meteor.user().emails[0].address;
  },
  points:function () {
    return Meteor.user().points;
  }
});

Template.navigation.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    },
    'click .my-profile-link': function(event) {
        event.preventDefault();
        var user=Meteor.userId();
        Router.go('myProfile',{_id:user});
    }
});
