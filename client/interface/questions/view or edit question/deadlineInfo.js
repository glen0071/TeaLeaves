Template.deadlineInfo.helpers({
    deadlineString:function(){
    var dead=this.deadline;
    var deadMoment = moment(dead);
    var timeLeft = deadMoment.fromNow();
    var deadString = deadMoment.format("dddd, MMMM D, YYYY, h:mm a")+" ("+timeLeft+")" ;
    return deadString;
  }
});

Template.registerHelper("deadlinePassed", function(){
    if (this.closed) {
      return true;
    }else{
      var dead=this.deadline;
      var deadMoment = moment(dead);
      var now = moment();
      if (now.isAfter(deadMoment)){
        Meteor.call("closeQuestion",this._id);
        return true;
      }
      return false;
    }
  }
);
