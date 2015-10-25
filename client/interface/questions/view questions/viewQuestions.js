Template.viewQuestions.onCreated(function () {

});

Template.viewQuestions.helpers({

});

Template.viewQuestions.events({
  "change [name=showClosed]": function(event, template){
    var btnValue = $('[name=showClosed]:checked').val();
      if(btnValue=='on'){
        Pages.set({
          filters: {}
        });
      }else{
        Pages.set({
          filters: {closed: {$ne:true}}
        });
      }
  },
  "change [name=viewQsBtn]": function(event, template){
    var btnValue = $('[name=viewQsBtn]:checked').val();
      switch (btnValue) {
        case "1":
          Pages.set({
    sort: {createdOn: -1}
  });
          break;
        case "2":
          Pages.set({
    sort: {createdOn: 1}
  });
          break;
        case "3":
        $('[name=showClosed]:checked').prop('checked',false);
          Pages.set({
    sort: {deadline: 1},
    filters: {closed: {$ne:true}}
  });

          break;
        case "4":
          Pages.set({
    sort: {answerCount: -1}
  });
          break;
        case "5":
          Pages.set({
    sort: {answerCount: 1}
  });
          break;
        case "6":
          Pages.set({
    sort: {upVotes: -1}
  });
          break;
      }
  },
});

Template.viewQuestion.events({
  'click .theme-link': function(event) {
    event.preventDefault();
    var theTheme = event.target.text;
    Router.go('viewTheme',{theme:theTheme});
  },

});
