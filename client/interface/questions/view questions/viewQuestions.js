Template.viewQuestions.onCreated(function () {
    this.subscribe('questions');
    this.newQs = new ReactiveVar( true );
    this.oldQs = new ReactiveVar( false );
    this.endQs = new ReactiveVar( false );
    this.popQs = new ReactiveVar( false );
    this.unpopQs = new ReactiveVar( false );
    this.topRatedQs = new ReactiveVar( false );
});

Template.viewQuestions.helpers({
  newQs: function(){
    return Template.instance().newQs.get();
  },
  showNewQs: function(){
    return Questions.find({}, {sort: {createdOn: -1}});
  },
  oldQs: function(){
    return Template.instance().oldQs.get();
  },
  showOldQs: function(){
    return Questions.find({}, {sort: {createdOn: 1}});
  },
  endQs: function(){
    return Template.instance().endQs.get();
  },
  showEndQs: function(){
    return Questions.find({}, {sort: {deadline: 1}});
  },
  popQs: function(){
    return Template.instance().popQs.get();
  },
  showPopQs: function(){
    return Questions.find({}, {sort: {answerCount: -1}})
  },
  unpopQs: function(){
    return Template.instance().unpopQs.get();
  },
  showUnpopQs: function(){
    return Questions.find({}, {sort: {answerCount: 1}})
  },
  topRatedQs: function(){
    return Template.instance().topRatedQs.get();
  },
  showTopRatedQs: function(){
    return Questions.find({}, {sort: {upVotes: -1}})
  },
});

Template.viewQuestions.events({
  "change [name=viewQsBtn]": function(event, template){
    var btnValue = $('[name=viewQsBtn]:checked').val();
      switch (btnValue) {
        case "1":
          template.newQs.set(true);
          template.oldQs.set(false);
          template.endQs.set(false);
          template.popQs.set(false);
          template.unpopQs.set(false);
          template.topRatedQs.set(false);
          break;
        case "2":
          template.oldQs.set(true);
          template.newQs.set(false);
          template.endQs.set(false);
          template.popQs.set(false);
          template.unpopQs.set(false);
          template.topRatedQs.set(false);
          break;
        case "3":
          template.endQs.set(true);
          template.oldQs.set(false);
          template.newQs.set(false);
          template.popQs.set(false);
          template.unpopQs.set(false);
          template.topRatedQs.set(false);
          break;
        case "4":
          template.popQs.set(true);
          template.endQs.set(false);
          template.oldQs.set(false);
          template.newQs.set(false);
          template.unpopQs.set(false);
          template.topRatedQs.set(false);
          break;
        case "5":
          template.unpopQs.set(true);
          template.popQs.set(false);
          template.endQs.set(false);
          template.oldQs.set(false);
          template.newQs.set(false);
          template.topRatedQs.set(false);
          break;
        case "6":
          template.topRatedQs.set(true);
          template.unpopQs.set(false);
          template.popQs.set(false);
          template.endQs.set(false);
          template.oldQs.set(false);
          template.newQs.set(false);
          break;
        default: template.newQs.set(true);
      }
  },
  'click .question-link': selectQuestion
});

function selectQuestion(e,t){
     Session.set('current_question',this._id);
}
Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  }
});
