'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Queue = require('./queue');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const qCat = new Queue();
const qDog = new Queue();

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const fake1 = {
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fake1',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};

const fake2 = {
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fake2',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};

const fake3 = {
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fake3',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};

const fake4 = {
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fake4',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};

const fake5 = {
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fake5',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
};

function peek(queue) {
  let node = queue.first;
  if (node === null) {
   return null;
  } 
  return node.data;
}
qCat.enqueue(fake1);
qCat.enqueue(fake2);
qCat.enqueue(fake3);
qCat.enqueue(fake4);
qCat.enqueue(fake5);

//Write peek function fifo, front of queue
//console.log(qCat);

console.log(peek(qCat));

app.get('/api/cat', (req, res) => {
  // q.enqueue('Sunny');
  //console.log(q);
  //q.dequeue();
  //console.log(q);
  //return peek(catQueue) display the correct node.
  // return res.json({
  //   imageURL:
  //     'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  //   imageDescription:
  //     'Orange bengal cat with black stripes lounging on concrete.',
  //   name: 'Fluffy',
  //   sex: 'Female',
  //   age: 2,
  //   breed: 'Bengal',
  //   story: 'Thrown on the street'
  // });
  return res.json(peek(qCat));
});

app.get('/api/dog', (req, res) => {
  return res.json({
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  });
});

//api/cat and api/dog use dequeue adopt button will attach to this.
app.delete('/api/cat', (req, res) => {
  //res.json('delete working');
  return res.sendStatus(204);
});

app.delete('/api/dog', (req, res) => {
  //res.json('delete working');
  return res.sendStatus(204);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
