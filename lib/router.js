Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'viewQuestions',
  template: 'viewQuestions'
})

Router.route('myProfile', {
  name: 'myProfile',
  template: 'myProfile',
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.render('/login')
    } else {
      this.next();
    }
  }
});

Router.route('login', {
  name: 'login',
  template: 'login'
});
Router.route('register', {
  name: 'register',
  template: 'register'
});

Router.route('social');
Router.route('addQuestion', {
  name: 'addQuestion',
  template: 'addQuestion',
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.render('/login')
    } else {
      this.next();
    }
  }
});

Router.route('search',
{
  name: 'search',
  template: 'search'
});
Router.route("/questions/:_id", {
  name: 'questionDetail',
  waitOn:function(){
    return [Meteor.subscribe('questionData', this.params._id),Meteor.subscribe('creatorData', this.params._id),Meteor.subscribe('answererData', this.params._id)];
  },
  data: function() {
    return Questions.findOne(this.params._id);
  }
});
Router.route("/user/:_id", {
  name: 'userProfile',
  waitOn: function() {
    return Meteor.subscribe('userData', this.params._id);
 	},
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});
Router.route("/theme/:theme", {
  name: 'viewTheme',
  data: function() {
    var theTheme = this.params.theme;
    return Questions.find({'themes.$':theTheme});
  }
});
