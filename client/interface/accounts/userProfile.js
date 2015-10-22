// A user can view and edit his profile from here
Template.userProfile.onCreated(function () {
    this.subscribe('questions');
    // limit to questions user created or answered
});


Template.userProfile.helpers({
  questionsAsked: function(){
    return Questions.find({createdBy: this._id}).count();
  },
  questionsUserAsked: function(){
    return Questions.find({createdBy: this._id});
  },
  questionsAnswered: function(){
    return Questions.find({"answers.userId": this._id}).count();
  },
  questionsUserAnswered: function(){
    return Questions.find({"answers.userId": this._id});
  },
  userName:function(){
    var user = Meteor.users.findOne({_id:this._id});
    return user.username ? user.username : user.emails[0].address;
    },
    points:function(){
      return Meteor.users.findOne({_id:this._id}).points;
    }
});

Template.userProfile.events({

});
