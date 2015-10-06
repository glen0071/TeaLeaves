Template.questionDetail.helpers({
  questions: function(){
    return Questions.find();
  },
  userName:function(){
    var user=this.createdBy;
    return Meteor.users.findOne({_id:user}).emails[0].address;
  },
  createdOnString:function(){
    var created=this.createdOn;
    return moment(created).format("dddd, MMMM D, YYYY, h:mm a");
  },
  deadlineString:function(){
    var dead=this.deadline;
    return moment(dead).format("dddd, MMMM D, YYYY, h:mm a");
  }
});

Template.questionDetail.onCreated(function () {
    this.subscribe('questions');
});
Template.questionDetail.events({
    'click .theme-link': function(event) {
      event.preventDefault();
      var theTheme = event.target.text;
      Router.go('viewTheme',{theme:theTheme});
    }
  });
