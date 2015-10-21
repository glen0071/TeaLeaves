Template.results.helpers({
  correctAnswerInWords: function(){
    if (this.correctAnswer == 1){
      return "Yes";
    }  else {
      return "No";
    }
  }
});
