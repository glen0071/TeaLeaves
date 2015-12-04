Template.following.onCreated(function () {
  this.autorun(function(c){
    var filters=Session.get('filters');
     //console.log('filters: '+EJSON.stringify(filters, {indent: true}));
     if(filters){
       Pages.set({
              filters: filters
            });
    }
  });
this.subscribe('questions', {limit: 100});
this.subscribe('allUsersData', {limit: 100}); // needs to be limited more precisely
});

Template.following.helpers({
  followedThemeQuestions: function() {
    var themesArray = Meteor.user().profile.followingThemes;
    return Questions.find({themes: {$in: themesArray}});
  },
  followedUserQuestions: function() {
    var usernamesArray = Meteor.user().profile.followingUsers;
    var idsArray = usernamesArray.map(function(obj){
      return userIds = Meteor.users.findOne({"username": obj})._id;
    });
    return Questions.find({createdBy: {$in: idsArray}});
  }
});

Template.following.events({
  "click #foo": function(event, template){

  }
});
