const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
const quizRouter=require('./routes/quiz');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const auth = require('./auth');
const cors = require('cors');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    db => {
      console.log('Successfully connected to MongodB server');
    },
    err => console.log(err)
  );

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/users', userRouter);
app.use('/quiz',quizRouter);
app.use('/upload', uploadRouter);
app.use(auth.verifyUser);
app.use('/tasks', taskRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
