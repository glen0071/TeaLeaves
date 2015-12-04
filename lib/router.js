Router.configure({
  layoutTemplate: 'layout',
  controller: 'ExtendedController'
});

ExtendedController = RouteController.extend({
  onAfterAction: function () {
    var routeName = Router.current().route.getName();
  //  console.log("settting currentRoute to: "+routeName);
    Session.set('currentRoute', routeName);
  }
});

Router.route('/', {
  name: 'viewQuestions',
  template: 'viewQuestions'
});

Router.route('myProfile', {
  name: 'myProfile',
  template: 'myProfile',
  waitOn: function() {
    return Meteor.subscribe('userData');
 	},
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

Router.route('forgotPassword', {
  name: 'forgotPassword',
  template: 'forgotPassword'
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

Router.route('leaderboard',
{
  name: 'leaderboard',
  template: 'leaderboard'
});

Router.route('dashboard',
{
  name: 'dashboard',
  template: 'dashboard'
});

Router.route("/editUser/:_id", {
  name: 'editUser',
  waitOn: function() {
    return Meteor.subscribe('editUserData', this.params._id);
 	},
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
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
  template:'viewQuestions'
});
