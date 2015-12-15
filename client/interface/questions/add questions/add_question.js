Template.addQuestion.onRendered(function() {
     var onlyDocument = PastThemes.findOne();
     var themesArray = onlyDocument.themes;
    $('#tokenfield').tokenfield({
      autocomplete: {
         source: themesArray,
         delay: 100
       },
       showAutocompleteOnFocus: true
    });
var validator = $('.add-question-form').validate({
    submitHandler: function(event){
      var varHeadline = $('[name=headline]').val();
      var varText = $('[name=text]').val();
      var varThemes = $('[name=themes]').val().toLowerCase().split(/,+\s*/);
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
    var onlyDocument = PastThemes.findOne();
    var collectionId = onlyDocument._id;
    Meteor.call("insertNewThemes", collectionId, varThemes);
    }
  });
  this.$('.datetimepicker').datetimepicker({minDate:new Date().setHours(0,0,0,0),defaultDate:moment().add(3, 'days')});
});

Template.addQuestion.events({
  'submit form': function(event, template){
    event.preventDefault();
  },
  'keypress #tokenfield': function(event, template){
  if (event.which === 13) {
    event.preventDefault();
  };
}

});
