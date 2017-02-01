var accounts = require('./../controllers/accounts.js'),
    categories = require('./../controllers/categories.js'),
    events = require('./../controllers/events.js');

// define routes
module.exports = function(app){
  // Acounts Routes
  app.get('/users', accounts.index);
  app.get('/users/:id', accounts.getUser)
  app.post('/login', accounts.login);
  
  // Category Routes
  app.get('/categories/:id', categories.getCategories);
  app.post('/categories', categories.addCategory); 

  app.post('/events', events.addEvent);
  app.delete('/events/:id', events.deleteEvent);
  // Event Routes
  // app.post('/eve/:id', questions.createAnswer);
//   app.get('/questions/:id', questions.showQuestion);
  
//   // Show/Add questions
//   app.post('/questions', questions.createQuestion);
//   app.get('/questions/:id/answer', questions.showQuestion);
  
//   // like answer
//   app.post('/answers/:id', questions.likeAnswer);
};