"use strict"

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop'); // bookshop is the name of the database

// db will hold mongoDB connection
var db = mongoose.connection;
// redefine log prefix to identify errors that happen in mongoDB
db.on('error', console.error.bind(console,'# MongoDB - connection error: '));
// ----> SET UP SESSIONS <-----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// SAVE SESSION CART API 
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});
// GET SESSION CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
// ----> END UP SESSION SET UP <-----

var Books = require('./models/books.js');

// ---> POST BOOKS <---
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// ---> GET BOOKS <---
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// ---> DELETE BOOKS <---
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
});

// ---> UPDATE BOOKS <---
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;

  // if the field doesnt exist $set will add a new field

  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price,
      discount: book.discount,
    }
  };
  // when true it returns an updated document
    var options = {new: true};

    Books.findOneAndUpdate(query, update, options, function(err, books){
      if(err){
        throw err;
      }
      res.json(books);
    })
});

// GET BOOKS IMAGES API
app.get('/images', function(req, res){
  const imageFolder = __dirname + '/public/images/';
  // Require file system
  const fileSystem = require('fs');
  // Read all files in the directory
  fileSystem.readdir(imageFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    // Iterate all images in the directory and add to the file array
    files.forEach(function(file){
      filesArr.push({name: file});
    });
    // Send the JSON response with the array of files
    res.json(filesArr);
  })
});

// End APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API server is listening on http://localhost:3001');
})