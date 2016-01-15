// A user can view and edit his profile from here
Template.userProfile.onCreated(function() {
  this.subscribe('questions', {
    limit: 100
  });
  // limit to questions user created or answered
});


Template.userProfile.helpers({
  questionsAsked: function() {
    return Questions.find({
      createdBy: this._id
    }).count();
  },
  questionsUserAsked: function() {
    return Questions.find({
      createdBy: this._id
    });
  },
  questionsAnswered: function() {
    return Questions.find({
      "answers.userId": this._id
    }).count();
  },
  questionsUserAnswered: function() {
    return Questions.find({
      "answers.userId": this._id
    });
  },
  userName: function() {
    var user = Meteor.users.findOne({
      _id: this._id
    });
    return user.username;
  },
  points: function() {
    return Meteor.users.findOne({
      _id: this._id
    }).points;
  },
  hideFollowBtn: function() {
    var userViewed = this.username;
    var array = Meteor.user().profile.followingUsers;
    if ($.inArray(userViewed, array) >= 0) {
      return "hideFollowBtn"
    } else {
      return ""
    }
  }
});

Template.userProfile.events({
  'click .follow-user': function(event, template) {
    event.preventDefault();
    var username = this.username;
    Meteor.call('followUser', username)
  },
  'click .unfollow-user': function(event, template) {
    event.preventDefault();
    var username = this.username;
    Meteor.call('unfollowUser', username)
  }
});

Template.userAnswers.helpers({
  aUserAnswer: function() {
    var viewedUsersId = Template.parentData(1)._id;
    var array = this.answers;
    for (i in array) {
      if (array[i].userId == viewedUsersId) {
        if (array[i].answer == true) {
          var hisAnswer = "yes";
        } else {
          var hisAnswer = "no";
        }
      }
    }
    return hisAnswer;
  }
});

Template.registerHelper("determineEmail", function() {
  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  var emailAddress, services;
  if (user.emails) {
    return emailAddress = user.emails[0].address;
  } else if (user.services) {
    services = user.services;
    switch (false) {
      case !services.facebook:
        return services.facebook.email;
      case !services.google:
        return services.google.email;
      case !services.twitter:
        return null;
      default:
        return null;
    }
  } else {
    return null;
  }
});
