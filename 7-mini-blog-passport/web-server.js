var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//===========================PASSPORT===============================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};
//==================================================================

//===========================CONFIGURATION==========================
// Start express application
var app = express();

// all environments - configuration
app.configure(function(){
    app.set('port', process.env.PORT || 3000);    
    app.use(express.static(__dirname + '/app'));    
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser()); 
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'securedsession' }));
    app.use(passport.initialize()); // Add passport initialization
    app.use(passport.session());    // Add passport initialization
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'app')));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//==================================================================

//===========================MONGO DB===============================
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {            
    // Schema
    var postSchema = new mongoose.Schema({
        id: Number,
        title: { type: String },
        text:  { type: String }
    });
    // Mongoose also creates a MongoDB collection called 'Posts' for these documents.
    var posts = mongoose.model('singlePost', postSchema);
    
    //===========================EXAMPLES===============================
    
    var post_example1 = new posts({
        id: 1,
        title: 'Recruiting Advice No One Tells You',
        text:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur venenatis blandit. Praesent vehicula, libero non pretium               vulputate, lacus arcu facilisis lectus, sed feugiat tellus nulla eu dolor. Nulla porta bibendum lectus quis euismod. Aliquam volutpat ultricies porttitor. Cras risus nisi, accumsan vel cursus ut, sollicitudin vitae dolor. Fusce scelerisque eleifend lectus in bibendum. Suspendisse lacinia egestas felis a volutpat.'
    });

    var post_example2 = new posts({
        id: 2,
        title: 'How to start writing and get closer to your goals',
        text:  'You have been thinking about starting a blog or writing a novel for a long time. You want to write but you just never do it. The best time was 5 years ago; the second best time is now. So, what keeps you away from your goals?'
    });
    
    var contID = 2;
    
    post_example1.save();
    post_example2.save();
    //==================================================================
    
    //===========================METHODS================================  
    app.get('/', function(req, res){        
      res.render('index', { title: 'Express' });
    });
    
    // get all posts
    app.get('/api/myPosts', function(req, res){
        posts.find(function(err, myPosts) {
            if (err) return console.error(err);
            res.send (myPosts);
        });
    });
        
    //get a particular post by ID
    app.get('/api/myPosts/:id', function(req, res){
        posts.findOne({ id: req.params.id }, function(err, selPost) {
            if (err) return console.error(err);
            res.send (selPost);
            });
    });
    
    // create a new post
    app.put('/newPost', function(req, res) { 
        var newPost = new posts({
            id: ++contID,
            title : req.body.title,
            text : req.body.text
        });
        newPost.save();
        res.json(true);
    });
    
    // update a created post
    app.post('/editPost', function(req, res) {
        posts.findOne({ id: req.body.id }, function (err, selPost){
            selPost.title = req.body.title;
            selPost.text = req.body.text;
            selPost.save();
        });
        res.json(true);
    }); 

    // delete a particular post
    app.delete('/delete/:id', function(req, res) {
        posts.remove({ id: req.params.id }, function (err) {
            if (err) return handleError(err);
            // removed!
            res.json(true);   
        });    
    });    
    
    //=====================PASSPORT METHODS=============================
    // route to test if the user is logged in or not
    app.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });
    
    // route to log in
    app.post('/login', passport.authenticate('local'), function(req, res) {
      res.send(req.user);
    });
    
    // route to log out
    app.post('/logout', function(req, res){
      req.logOut();
      res.send(200);
    });            
    //==================================================================
});
//==================================================================

mongoose.connect('mongodb://localhost/test');
