const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({

  category: {
    type: String,
    required: true
  },

  question: {
    type: String,
    required: true
  },

  correct_answer: {
    type: String,
    required: true
  },

  incorrect_answer:{
    type:[String],
    required:true
  }

});

module.exports = mongoose.model('Quiz', quizSchema);
