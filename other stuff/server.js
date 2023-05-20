// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express =require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port =5000;
const server = app.listen(port,() =>{
    console.log('server running');
    console.log(`current server port: ${port}`);
});
//Route to send our endpoint data
app.get('/addWeatherData', (req, res) =>{
    console.log(req.body);
    res.send(projectData);
});
//Route to store data at our endpoint and send stored data if needed
app.post('/postData',(req, res) =>{
    let newData =req.body;
    console.log(newData);
    console.log('received data: ', newData);
    projectData.date = newData.date;
    projectData.temp = newData.temp;
    projectData.feelings = newData.feelings;
    res.send(projectData);
});