Template.questionDetail.onCreated(function() {
    editQuestionMode = this.editQuestionMode = new ReactiveVar( false );
    this.subscribe('pastThemes');
});

Template.changeDeadline.onRendered(function() {
    var currentDeadline = Template.parentData(0).deadline;
    this.$('.datetimepicker').datetimepicker({defaultDate:currentDeadline});

    var onlyDocument = PastThemes.findOne();
    var themesArray = onlyDocument.themes;
    event.preventDefault();
    $('#tokenfield').tokenfield({
      autocomplete: {
         source: themesArray,
         delay: 100
       },
       showAutocompleteOnFocus: true
    });
});

Template.questionDetail.helpers({
  editable: function() {
    var createdBy = this.createdBy;
    var currentUser = Meteor.userId();
    var now = new Date();
    var createdAt = this.createdOn;
    var closeTime = this.deadline;
    var fortyEightHours = 172800000;
    if (
        (createdBy === currentUser) &&
        (closeTime - now > fortyEightHours) &&
        (now - createdAt < fortyEightHours)
      ) {
        return "true"
      } else {
        return ""
      }
  },
  questions: function(){
    return Questions.find();
  },
  showthemes: function() {
    return this.themes.join(', ');
  },
  userName:function(){
    var user = Meteor.users.findOne({_id:this.createdBy});
    if(user === undefined){
      return "closed account"
    } else {
    return user.username;
    }
  },
  createdOnString:function(){
    var created=this.createdOn;
    return moment(created).format("dddd, MMMM D, YYYY, h:mm a");
  },
  answerStatus:function(){
    Session.get('unanswered');
  },
  unanswered:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return (object.userId === currentUser)
    });
    if(filtered.length === 0) {
      return true
    }
  },
  answered:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return (object.userId === currentUser)
    });
    if(filtered.length > 0) {
      return true
    }
  },
  answeredYes:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if(filtered.length > 0) {
      return true
    }
  },
  answeredNo:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if(filtered.length > 0) {
      return true
    }
  },
  votedYes:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === true))
    });
    if(filtered.length == 1) {
      return "disabled"
    }
  },
  votedNo:function(){
    var answersArray = this.answers;
    var currentUser = Meteor.userId();
    var filtered = answersArray.filter(function(object){
      return ((object.userId === currentUser) && (object.answer === false))
    });
    if(filtered.length == 1) {
      return "disabled"
    }
  },
  editQuestionMode: function() {
    return Template.instance().editQuestionMode.get();
  },
  testingtesting1: function() {
   return this.deadline;
  },
  testingtesting2: function() {
   return this.deadline.toString();
  },
  testingtesting3: function() {
   return this.deadline.parse();
  },
  testingtesting4: function() {
   return this.deadline.toISOString();
  }
});

Template.questionDetail.events({
  'click .profile-link': function(event) {
      event.preventDefault();
      var user=this.createdBy;
      Router.go('userProfile',{_id:user});
    },
    'click .theme-link': function(event) {
      event.preventDefault();
      var theTheme = event.target.text;
      Router.go('viewTheme',{theme:theTheme});
    },
    'click #newVoteYes': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      var currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('newVoteYes', currentQuestion);
      }
    },
    'click #newVoteNo': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('newVoteNo', currentQuestion);
      }
    },
    'click #changeVoteYes': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('changeVoteYes', currentQuestion);
      }
    },
    'click #changeVoteNo': function(event) {
      event.preventDefault();
      var currentUser = Meteor.userId();
      currentQuestion = this._id;
      if(!currentUser){
        alert('sorry, you must be logged in to do that. Please sign up or login now!')
      } else {
        Meteor.call('changeVoteNo', currentQuestion);
      }
    },
    'click #revoteYes': function(event) {
      event.preventDefault();
      alert("you already voted Yes");
    },
    'click #revoteNo': function(event) {
      event.preventDefault();
      alert("you already voted No");
    },
    'click #edit-question-link': function(event, template){
        event.preventDefault();
        template.editQuestionMode.set( true );

    },
    'submit form': function(event, template){
        event.preventDefault();
        var currentQuestion = this._id;
        var newHeadline = $('[name=editHeadline]').val();
        var newText = $('[name=editText]').val();
        var newThemes = $('[name=editThemes]').val().toLowerCase().split(/,+\s*/);
        var newDeadline = $('.datetimepicker').data("DateTimePicker").date().toDate();
        Meteor.call('updateQuestion', currentQuestion, newHeadline, newText, newThemes, newDeadline)
        template.editQuestionMode.set( false );

        var onlyDocument = PastThemes.findOne();
        var collectionId = onlyDocument._id;
        Meteor.call("insertNewThemes", collectionId, newThemes);
    },
    'click #cancel-edits-link': function(event, template){
        event.preventDefault();
        template.editQuestionMode.set( false );
    },
    'click #delete-question': function(event, template){
      event.preventDefault();
      var currentQuestion = this._id;
      var confirmed = window.confirm("Are you sure you'd like to delete this question?")
      if(confirmed){
        Meteor.call('deleteQuestion', currentQuestion);
        Router.go('myProfile');
      }
    },
    'click #admin-edit-btn': function(event, template){
      event.preventDefault();
      editQuestionMode.toggle();
    }
});
