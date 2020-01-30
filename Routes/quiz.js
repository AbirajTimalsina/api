const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

router.post('/', (req, res, next) => {
  Quiz.create({
    category: req.body.category,
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    incorrect_answer: req.body.incorrect_answer
  })
    .then(quiz => {
      res.json({status:"Successfully Inserted"});
      console.log('status:successfully inserted');
    })
    .catch(next);
});

module.exports = router;
