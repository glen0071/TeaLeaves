
var numberOfVotes = function(question){
  return question.answers.length;
};
var numberOfYesVotes = function(question){
  var questionDoc = Questions.findOne(question);
return questionDoc.answers.filter(testForTrue).length;
};
var numberOfNoVotes = function(question){
  var questionDoc = Questions.findOne(question);
return questionDoc.answers.filter(testForFalse).length;
};
var testForTrue = function(value){
  return value.answer==true;
};
var testForFalse = function(value){
  return value.answer==false;
}

Template.results.helpers({
  numberOfVotes: function(){
    return this.answers.length;
  },
  correctAnswerInWords: function(){
    if (this.correctAnswer == 1){
      return "Yes";
    }  else {
      return "No";
    }
  },
  resultsChart: function() {
    Highcharts.setOptions({
        colors: ['green','red']
    });
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
      return {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              height:400,
              width:400
          },
          title: {
              text: "Results ("+numberOfVotes(this)+" votes)",
              margin:10
          },
          tooltip: {
              pointFormat: '<b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      },
                      connectorColor: 'silver'
                  }
              }
          },
          series: [{
              type: 'pie',
              name: 'votes',
              data: [
                  ['Yes',   numberOfYesVotes(this)],
                  ['No',       numberOfNoVotes(this)]
              ]
          }]
      };
  }
});
