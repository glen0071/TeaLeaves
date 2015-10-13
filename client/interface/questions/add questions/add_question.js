Template.addQuestion.events({
  'submit form': function(event, template){
    event.preventDefault();
    var varHeadline = $('[name=headline]').val();
    var varText = $('[name=text]').val();
    var varThemes = $('[name=themes]').val().split(/,+\s*/);
    var varDeadline=$('.datetimepicker').data("DateTimePicker").date().toDate();
    Meteor.call('createNewQuestion', varHeadline, varText, varThemes, varDeadline, function(error,results) {
      if(error){
        console.log(error.reason);
      }else{
        Router.go('questionDetail', {
          _id: results
        });
        $('[name=headline]').val('');
        $('[name=themes]').val('');
        $('[name=text]').val('');
        $('.datetimepicker').val('');
      }
    });
  }
});
Template.addQuestion.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({minDate:new Date().setHours(0,0,0,0),defaultDate:moment().add(3, 'days')});

});
