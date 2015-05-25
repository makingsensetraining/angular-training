var express = require("express"),
    app     = express()
var _ = require("underscore");

var myTasks = [{
    id: 1,
    text: 'Task test 1',
    done: true
    },
    {
    id: 2,
    text: 'Task test 2',
    done: false
    },
    {
    id:3,
    text: 'Hello world !',
    done: true
    }
];

//==================================================================

//===========================CONFIGURATION==========================
var cont = myTasks.length;

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

//==================================================================
    
//===========================METHODS================================
app.get("/", function(req, res) {
    res.redirect("/index.html");
});

// get all tasks
app.get('/api/myTasks', function(req, res){
    res.send (myTasks) ;
});

app.post('/newTask', function(req, res) {
    var newTask = {
        id : ++cont,
        text : req.body.text,
        done : req.body.done
    };
    myTasks.push(newTask);
    res.json(newTask);
});

// delete a particular task
app.delete('/delete', function(req, res) {
    var selTasks = _.where(myTasks, {done: false});
    myTasks = selTasks;
    res.json(selTasks);
});

app.put('/selectedTask/:id', function(req, res) {
    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
    var taskIndex = myTasks.indexOf(selTask);
    myTasks[taskIndex].done = !myTasks[taskIndex].done;
    res.json(myTasks[taskIndex]);
});

app.delete('/delTask/:id', function(req, res){
    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
    var taskIndex = myTasks.indexOf(selTask);
    myTasks.splice(taskIndex, 1);
    res.json(req.params.id);
});
//==================================================================