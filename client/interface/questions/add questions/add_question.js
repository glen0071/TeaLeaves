Template.addQuestion.events({
  'submit form': function(event, template){
    event.preventDefault();
    console.log("workin it!");
    var varHeadline = $('[name=headline]').val();
    var varText = $('[name=text]').val();
    var varThemes = $('[name=tthemes]').val();
    var varDeadline=$('.datetimepicker').data("DateTimePicker").date().toDate();
    Meteor.call('createNewQuestion', varHeadline, varText, varThemes,varDeadline, function() {

    });
  }
});
Template.addQuestion.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({minDate:new Date().setHours(0,0,0,0),defaultDate:moment().add(3, 'days')});

});
