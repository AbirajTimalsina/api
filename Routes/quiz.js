const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

router.post('/quiz', (req, res, next) => {
  Quiz.create({
    category: req.body.category,
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    incorrect_answer: req.body.incorrect_answer
  })
    .then(quiz => {
      res.json({ status: 'Successfully Inserted' });
    })
    .catch(next);
});
router.get('/quiz/category', (req, res, next) => {
  Quiz.find()
    .then(quiz => {
      res.json(quiz);
    })
    .catch(next);
});

router.get('/quiz/:category', (req, res, next) => {
  Quiz.find({ category: req.params.category })
    .then(quiz => {
      res.json(quiz);
    })
    .catch(next);
});

router.delete('/:quizId', (req, res, next) => {
  Quiz.findByIdAndDelete(req.params.quizId).then(quiz => {
    res.json({ status: 'quiz deleted' });
  });
});

module.exports = router;
