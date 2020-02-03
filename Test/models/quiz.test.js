const quiz = require('../../Models/quiz');
const mongoose = require('mongoose');
const testDb = 'mongodb://127.0.0.1/androidApi_Test';

beforeAll(async () => {
  await mongoose.connect(testDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // mondb is async function so wait is needed to remove warning.
  await mongoose.connection.close();
});

describe('Test of quiz schema', () => {
  test('Should create a new quiz', () => {
    return quiz
      .create({
        category: 'Religion',
        question: 'Worlds First Religion?',
        correct_answer: 'Hindu',
        incorrect_answer: ['Muslim', 'Sikh','Buddhist', 'Hindu']
      })
      .then(response => {
        expect(response.category).toBe('Religion');
          expect(response.question).toBe('Worlds First Religion?');
          expect(response.correct_answer).toBe('Hindu');
          expect(response.incorrect_answer).toBe['Muslim', 'Sikh','Buddhist', 'Hindu'];
      });
  });
    test('should update quiz',()=>{
        return quiz.findOne({
          category: 'History',
          question: 'first worldwar?',
          correct_answer: '1914',
          incorrect_answer:  ['1814', '1954','1687', '1914']
        })
        .then((quez)=>{
            quez.category='History',
            quez.question= 'first worldwar?',
            quez.correct_answer= '1914',
            quez.incorrect_answer= ['1814', '1954','1687', '1914']
            quez.save().then((updatedquez)=>{
              expect(updatedquez.category).toBe('History');
              expect(updatedquez.question).toBe('first worldwar?');
              expect(updatedquez.correct_answer).toBe('1914');
              expect(updatedquez.incorrect_answer).toBe ['1814', '1954','1687', '1914'];
          })
        })
    })

    test('should delete the quiz', () => {
        return quiz.findOneAndDelete({
          category: 'history',
          question: 'first worldwar?',
          correct_answer: '1914',
          incorrect_answer: ['1814', '1954','1687', '1914']
      })
      .then((response)=>{
          expect(response.category).toBe('history'),
          expect(response.question).toBe('first worldwar?'),
          expect(response.correct_answer).toBe('1914'),
          expect(response.incorrect_answer).toBe ['1814', '1954','1687', '1914']
    })
})
})
