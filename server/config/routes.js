var accounts = require('./../controllers/accounts.js')
//     questions = require('./../controllers/questions.js');

// define routes
module.exports = function(app){
  // Acounts Routes
  app.get('/users', accounts.index);
  app.get('/users/:id', accounts.getUser)
  app.post('/login', accounts.login);
  
//   // Dashboard Routes
//   app.get('/questions', questions.index);
  
//   // Show/add answers
//   app.post('/questions/:id', questions.createAnswer);
//   app.get('/questions/:id', questions.showQuestion);
  
//   // Show/Add questions
//   app.post('/questions', questions.createQuestion);
//   app.get('/questions/:id/answer', questions.showQuestion);
  
//   // like answer
//   app.post('/answers/:id', questions.likeAnswer);
};