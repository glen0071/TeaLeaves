Questions = new Meteor.Collection('questions');
this.Pages = new Meteor.Pagination(Questions, {
  availableSettings: {
    filters: true,
    settings: true,
    sort:true
  },
  router: "iron-router",
  route: "/viewQuestions/",
  templateName: "Questions",
  homeRoute: "/questions",
  routerLayout: "layout",
  itemTemplate: "viewQuestion",
  infinite:true
});
