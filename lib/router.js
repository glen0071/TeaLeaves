Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'viewQuestions',
  template: 'viewQuestions',
  onAfterAction: function(){
    var filters = {closed: {$ne:true}};
  	Session.set('filters',filters);
    Pages.set({
      sort: {createdOn: -1} });
  }
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

Router.route('recoverPassword', {
  name: 'recoverPassword',
  template: 'recoverPassword'
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
  template:'viewQuestions',
  onAfterAction: function(){
    var theTheme = this.params.theme;
    var filters = Session.get('filters') ? Session.get('filters'): {closed: {$ne:true}};
    filters.themes = theTheme
    Session.set('filters',filters);
  }
});
