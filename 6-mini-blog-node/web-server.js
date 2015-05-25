var express = require("express"),
    app     = express()
var _ = require("underscore");


var posts = [{
        id: 1,
        title: 'Post 1',
        text:  'Text Post 1.'
},
    {
        id: 2,
        title: 'Post 2',
        text:  'Text Post 2.'
    }
];


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

var contID = posts.length;

    // get all posts
    app.get('/api/myPosts', function(req, res){
        res.send (posts) ;
    });
        
    //get a particular post by ID
    app.get('/api/myPosts/:id', function(req, res){
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.params.id});
        res.send(selPost);
    });
    
    // create a new post
    app.post('/newPost', function(req, res) {
        var newPost = {
            id: ++contID,
            title: req.body.title,
            text: req.body.text
        };

        posts.push(newPost);
        res.json(true);
    });
    
    // update a created post
    app.put('/editPost', function(req, res) {
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.body.id});
        var postIndex = posts.indexOf(selPost);
        posts[postIndex].title  = req.body.title;
        posts[postIndex].text  = req.body.text;
        res.json(true);
    }); 

    // delete a particular post
    app.delete('/delete/:id', function(req, res) {
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.params.id});
        var postIndex = posts.indexOf(selPost);
        posts.splice(postIndex, 1);
        res.json(true);   
    });

// _____________________________________________________________________________________________________ 

