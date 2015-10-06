Router.configure({
  layoutTemplate: 'layout'
})

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

Router.route('viewQuestions');
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
  data: function() {
    return Questions.findOne(this.params._id);
  }
});
Router.route("/theme/:theme", {
  name: 'viewTheme',
  data: function() {
    var theTheme = this.params.theme;
    return Questions.find({'themes.$':theTheme});
  }
});
