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
