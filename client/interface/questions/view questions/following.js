Template.following.onCreated(function () {
  this.autorun(function(c){
    var filters=Session.get('filters');
     //console.log('filters: '+EJSON.stringify(filters, {indent: true}));
     if(filters){
       Pages.set({
              filters: filters
            });
    }
  });
});

Template.following.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.following.events({
  "click #foo": function(event, template){

  }
});
