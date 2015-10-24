Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'myProfile',
  template: 'myProfile'
});
Router.route('login', {
  name: 'login',
  template: 'login'
});
Router.route('register', {
  name: 'register',
  template: 'register'
});

ViewQuestionsController = RouteController.extend({
  template: 'viewQuestions',
  increment: 5,
  qsLimit: function() {
    return parseInt(this.params.qsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.qsLimit()};
  },
  subscriptions: function() {
     Meteor.subscribe('questions', this.findOptions());
  },
  questions: function() {
    return Questions.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.questions().count() === this.qsLimit();
    var nextPath = this.route.path({qsLimit: this.qsLimit() + this.increment});
    return {
      questions: this.questions(),
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.route('/viewQuestions/:qsLimit?', {
  name: 'viewQuestions',
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
