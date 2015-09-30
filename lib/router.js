Router.configure({
  layoutTemplate: 'layout'
})

Router.route('/', {
  name: 'myProfile',
  template: 'myProfile'
});

Router.route('/viewQuestions');
Router.route('/addQuestion', {
  name: 'addQuestion',
  template: 'addQuestion'
});
