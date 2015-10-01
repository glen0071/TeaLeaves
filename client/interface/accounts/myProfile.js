// A user can view and edit his profile from here

Template.myProfile.helpers({
  // rendered: function(){
  //
  // }
});

Template.myProfile.events({
  "submit form": function(event, template){
    event.preventDefault();
    var varEditTopics = $('[editTopics]').val();
  }
});
