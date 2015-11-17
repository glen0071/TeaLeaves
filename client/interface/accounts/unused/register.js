// $('.username').keydown(function(e){
//     if (e.which === 32) {
//         e.preventDefault();
//     }
// }).blur(function() {
//     $(this).val(function(i,oldVal){ return oldVal.replace(/\s/g,''); });
// });
//
// $.validator.setDefaults({
//     rules: {
//       email: {
//         required: true,
//         email: true
//       },
//       password: {
//         minlength: 6,
//         required: true
//       },
//       username: {
//         minlength: 3,
//         required: false
//       }
//     },
//     messages: {
//       email: {
//         required: "You must enter an email address.",
//         email: "Email address invalid."
//       },
//       password: {
//         required: "You must enter a password.",
//         minlength: "Your password must be at least {0} characters."
//       }
//     }
//   });
//
//   Template.register.onRendered(function() {
//   var validator = $('.register').validate({
//       submitHandler: function(event) {
//           var varEmail = $('[name=email]').val();
//           var varUsername = $('[name=username]').val();
//           var varPassword = $('[name=password]').val();
//           Accounts.createUser({
//                 email: varEmail,
//                 password: varPassword,
//                 username: varUsername,
//                 createdOn: new Date(),
//                 points: 0,
//                 followingThemes: [],
//                 followingUsers: []
//         },function(error) {
//           if (error) {
//             if (error.reason == "Email already exists.") {
//               validator.showErrors({
//                 email: "That email already belongs to a registered user."
//               });
//             }else if (error.reason == "Username already exists.") {
//               validator.showErrors({
//                 username: 'That username is already in use.'
//               });
//             }else{
//               console.log('Error: '+error.reason);
//             }
//           } else {
//             Meteor.loginWithPassword(varEmail, varPassword);
//             var user = Meteor.userId();
//             Meteor.call('addDefaultRole', user);
//             Router.go("viewQuestions");
//           }
//       });
//     }
//   });
// });
//
// Template.register.events({
//   'submit form':function(event){
//     event.preventDefault();
//   }
// });
