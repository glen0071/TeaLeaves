Template.deadlineInfo.helpers({
  deadlinePassed:function(){
    console.log(this);

    var dead=this.deadline;
    var deadMoment = moment(dead);
    var now = moment();
    if (now.isAfter(deadMoment)){
      return true;
    }
    return false;
  },
  deadlineString:function(){
    var dead=this.deadline;
    var deadMoment = moment(dead);
    var timeLeft = deadMoment.fromNow();
    var deadString = deadMoment.format("dddd, MMMM D, YYYY, h:mm a")+" ("+timeLeft+")" ;
    return deadString;
  }
});
