Template.addQuestion.events({
  'submit form': function(event, template){
    event.preventDefault();
    console.log("workin it!");
    var varHeadline = $('[name=headline]').val();
    var varText = $('[name=text]').val();
    var varThemes = $('[name=tthemes]').val();
    Meteor.call('createNewQuestion', varHeadline, varText, varThemes, function() {

    });
  }
});
