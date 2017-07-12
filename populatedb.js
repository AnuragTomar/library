#! /usr/bin/env node

console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Book = require('./models/book')
var Author = require('./models/author')
var Genre = require('./models/genre')
var User= require('./models/user')
var Comment=require('./models/comment')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var genres = []
var books = []
var users = []
var comments =[]

function authorCreate(first_name, family_name, d_birth, d_death, cb) {
  authordetail = {first_name:first_name , family_name: family_name }
  if (d_birth != false) authordetail.date_of_birth = d_birth
  if (d_death != false) authordetail.date_of_death = d_death
  
  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function bookCreate(title, summary, isbn, author, genre, cb) {
  bookdetail = { 
    title: title,
    summary: summary,
    author: author,
    isbn: isbn
  }
  if (genre != false) bookdetail.genre = genre
    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}


function commentCreate(user_name, book, page_number, fav_part, description, published_date, cb){
  commentdetail={
    user_name:user_name,
    book:book,
    page_number:page_number,
    published_date:published_date
  }
  if(fav_part!=false) commentdetail.fav_part=fav_part
  if(description!=false) commentdetail.description=description

  var comment=new Comment(commentdetail);
  comment.save(function(err){
    if(err){
       cb(err,null)
       return
    }
    console.log('New Comment: '+ comment);
    comments.push(comment)
    cb(null,comment)
  }  );
}

function userCreate(firstname,lastname,user_name,password,email,preferred_genres,fav_authors,fav_books,cb){
  userdetail={
    firstname:firstname,
    lastname:lastname,
    user_name:user_name,
    password:password,
    email:email,
  }
  if(preferred_genres!=false) userdetail.preferred_genres=preferred_genres
  if(fav_authors!=false) userdetail.fav_authors=fav_authors
  if(fav_books!=false) userdetail.fav_books=fav_books

  var user=new User(userdetail);
  user.save(function(err){
    if(err){
      cb(err,null)
      return
    }
    console.log('New User: '+ user);
    users.push(user)
    cb(null,user)
  }  );
} 


function createGenreAuthors(cb) {
    async.parallel([
        function(callback) {
          authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        },
        function(callback) {
          authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
        },
        function(callback) {
          authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          authorCreate('Bob', 'Billings', false, false, callback);
        },
        function(callback) {
          authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
        },
        function(callback) {
          genreCreate("Fantasy", callback);
        },
        function(callback) {
          genreCreate("Science Fiction", callback);
        },
        function(callback) {
          genreCreate("French Poetry", callback);
        },
        ],
        // optional callback
        cb);
}

function createUsers(cb){
    async.parallel([
        function(callback){
               userCreate('Anu','Tomar','anurag','8237715234','anurag@gmail.com',[genres[0],],[authors[0],],[books[0],],callback);
        },        
        function(callback){
               userCreate('Anurag','Tom','tomar','9237715233','tomar@gmail.com',[genres[1],],[authors[1],],[books[1],],callback);
        },
        function(callback){
               userCreate('Anurag','Tomar','anuragtomar','8237715233','anuragtomar@gmail.com',[genres[0],genres[1],],[authors[0],authors[1],],[books[0],books[1],],callback);
        },
     ],
     cb);
}

function createComments(cb){
    async.parallel([
           function(callback){
                    commentCreate(users[0],books[0],20,'her smile could end wars and cure cancer',' how beautifully author explains beauty of the smile of his crush','2017-07-12',callback);
           },
           function(callback){
                    commentCreate(users[1],books[0],30,'a bullet is forever','bob lee swagger from shooter tv series recalls his friend  saying a bullet is forever','2017-06-12',callback);
           },
           function(callback){
                    commentCreate(users[1],books[1],100,'it is amazing how our mind connects one thought to another until it reaches where it want to go','chetan bhagat in his novel explains a very deep fact','2017-06-1',callback);
           },
           ],
           cb);
}

function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
        },
        function(callback) {
          bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
        },
        function(callback) {
          bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
        },
        function(callback) {
          bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
        },
        function(callback) {
          bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
        },
        function(callback) {
          bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], callback);
        },
        function(callback) {
          bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
        }
        ],
        // optional callback
        cb);
}

async.series([
    createGenreAuthors,
    createBooks,
    createUsers,
    createComments,
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Database ready');
    }
    //All done, disconnect from database
    mongoose.connection.close();
});




