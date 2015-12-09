Meteor.publish('pastThemes',function(){
  return PastThemes.find();
});
