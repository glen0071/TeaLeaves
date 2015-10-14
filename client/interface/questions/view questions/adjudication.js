Template.adjudication.helpers({

  questionBelongsToCurrentUser: function() {
    var createdBy = this.createdBy;
    var currentUser = Meteor.userId();
    return (createdBy === currentUser);
  },

  unadjudicated: function() {
    var correctAnswer = this.correctAnswer;
  //  console.log('correctAnswer: '+correctAnswer);
    if (correctAnswer == null) {
  //    console.log('returning unadjudicated=true');
      return true;
    }
    return false;
  },
  adjudicated: function() {
    var correctAnswer = this.correctAnswer;
    if (correctAnswer === null) {
      return false;
    }
    return true;
  },
  adjudicatedYes: function() {
    var correctAnswer = this.correctAnswer;
    if (correctAnswer === true) {
      return true;
    }
    return false;

  },
  adjudicatedNo: function() {
    var correctAnswer = this.correctAnswer;
    if (correctAnswer === false) {
      return true;
    }
    return false;

  },
});

Template.adjudication.events({
  "click .btn": function(event){
    console.log("click btn");
    $('#submit-adjudication').prop('disabled', false);
},
  "click #submit-adjudication": function(event){
    console.log("click submit-adjudication");
    event.preventDefault();
    var answer=($('#adjudication-group label.active input').val());
    var currentQuestion = this._id;
    //console.log('answer: '+answer);
    Meteor.call('adjudicate', answer, currentQuestion, function(error,results) {
      if(error){
        console.log(error.reason);
      }else{

      }
    });

  }
});
