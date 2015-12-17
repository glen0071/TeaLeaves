Template.voting.helpers({
  id: function() {
    return this._id;
  },
  unanswered: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length === 0) {
      return true
    }
  },
  answered: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length > 0) {
      return true
    }
  },
  answeredYes: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  answeredNo: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  }
});


Template.votingSmall.helpers({
  id: function() {
    return this._id;
  },
  unanswered: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length === 0) {
      return true
    }
  },
  answered: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length > 0) {
      return true
    }
  },
  answeredYes: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if (filtered.length > 0) {
      return true
    }
  },
  answeredNo: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if (filtered.length > 0) {
      return true
    }
  },
  votedYes: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if (filtered.length == 1) {
      return true;
      //  return "disabled grayed"
    } else {
      return false;
      //return "btn-success"
    }
  },
  votedNo: function() {
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if (filtered.length == 1) {
      return true;
    } else {
      return false;
    }
  }
});

Template.votingSmall.onRendered(function() {
  $('.switch')['bootstrapSwitch']();
  $('.switch').on('switchChange.bootstrapSwitch', function(event, state) {
    var currentUser = Meteor.userId();
    var currentQuestion = this.id;
    // console.log('currentQuestion (OSC): '+currentQuestion);

    if (!currentUser) {
      alert('sorry, you must be logged in to do that. Please sign up or login now!')
    } else {
      Meteor.call('updateVote', state, currentQuestion);
    }
  });
  this.autorun(function(c) {
    var currentQuestion = Template.currentData()._id;
    // console.log('currentQuestion (AR): '+currentQuestion);
    var answersArray = Template.currentData().answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length > 0) {
      $('#' + currentQuestion).bootstrapSwitch('state', filtered[0].answer, filtered[0].answer);
    }
  });
});

Template.voting.onRendered(function() {
  $('.switch')['bootstrapSwitch']();
  $('.switch').on('switchChange.bootstrapSwitch', function(event, state) {
    var currentUser = Meteor.userId();
    var currentQuestion = this.id;
    // console.log('currentQuestion (OSC): '+currentQuestion);
    if (!currentUser) {
      alert('sorry, you must be logged in to do that. Please sign up or login now!')
    } else {
      Meteor.call('updateVote', state, currentQuestion);
    }
  });
  this.autorun(function(c) {
    var currentQuestion = Template.currentData()._id;
    // console.log('currentQuestion (AR): '+currentQuestion);
    var answersArray = Template.currentData().answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object) {
      return (object.userId === currentUser)
    });
    if (filtered.length > 0) {
      $('#' + currentQuestion).bootstrapSwitch('state', filtered[0].answer, filtered[0].answer);
    }
  });
});

Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme', {
      theme: theTheme
    });
  }
});
