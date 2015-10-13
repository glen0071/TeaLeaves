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
  }
});
