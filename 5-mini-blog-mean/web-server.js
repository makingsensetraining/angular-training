var express = require("express"),
    app     = express()
var _ = require("underscore");
var mongoose = require('mongoose');

// configuration _______________________________________________________________________________________ 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(req, res) {
    res.redirect("/index.html");
});

// _____________________________________________________________________________________________________ 

// mongo db ____________________________________________________________________________________________ 

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
    
    // examples ____________________________________________________________________________________________ 
    
    var post_example1 = new posts({
        id: 1,
        title: 'Recruiting Advice No One Tells You',
        text:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur venenatis blandit. Praesent vehicula, libero non pretium vulputate, lacus arcu facilisis                lectus, sed feugiat tellus nulla eu dolor. Nulla porta bibendum lectus quis euismod. Aliquam volutpat ultricies porttitor. Cras risus nisi, accumsan vel cursus ut,                    sollicitudin vitae dolor. Fusce scelerisque eleifend lectus in bibendum. Suspendisse lacinia egestas felis a volutpat.'
    });

    var post_example2 = new posts({
        id: 2,
        title: 'How to start writing and get closer to your goals',
        text:  'You have been thinking about starting a blog or writing a novel for a long time. You want to write but you just never do it. The best time was 5 years ago; the second                 best time is now. So, what keeps you away from your goals?'
    });
    
    var contID = 2;
    
    post_example1.save();
    post_example2.save();
    
    // _____________________________________________________________________________________________________ 
    
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
    app.post('/newPost', function(req, res) {
        var newPost = new posts({
            id: ++contID,
            title : req.body.title,
            text : req.body.text
        });
        newPost.save();
        res.json(true);
    });
    
    // update a created post
    app.put('/editPost', function(req, res) {
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
});

// _____________________________________________________________________________________________________ 

mongoose.connect('mongodb://localhost/test');