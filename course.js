const express = require('express');
const app = express();

app.use(express.json());

//lets make an array of courses
var courses = [
    {
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }           
];

var nextId = 4;


app.get('/', function(req, res) {
    console.log("Received a request> " + req.body)
    var numCourses = courses.length
    res.send("Hello there... we have " + numCourses + " courses to offer!")
});

//prints the list of courses in JSON format
app.get('/api/courses', function(req,res){
    res.send(courses);
});

//To add a new course to the list
app.post('/api/courses', function(req,res){
    var course = {
        id: nextId++,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});


//To insert an existing course
app.put('/api/courses/:id', function(req, res){
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with given ID')
    }
    course.name = req.body.name;
    res.send(course);

});

//To delete a course
app.delete('/api/courses/:id', function(req, res){
    let present = courses.find(c => c.id===parseInt(req.params.id));
    var index = courses.indexOf(present);
    courses.splice(index, 1); //removes course at index
    res.send(present);
})




const port = process.env.PORT || 3000
//starting the server
app.listen(port, () => console.log("Running on " + port) ); 