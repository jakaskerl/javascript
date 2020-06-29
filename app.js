//Necessary imports
const express = require('express');
const app = express();
const qh = require('./queryHandler');


const {Client} = require('pg');
let toSql;
const PORT = 5800;


//Instance of client that is used for acquiring desired info from database
const client = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'geogis',
    password: 'rndpassword',
    port: 5432,
})



//Logging the process to the console 
app.use('/', (req, res, next) => {
    console.log("Request received!");
    next();
})


app.use('/', express.static('public'));

app.use ('/response', (req, res, next) => {
    console.log("Request passed.");
    next();
})


client.connect(err => {
    if (err) {
      console.error("Connection failed, restart the application.", err.stack)
    } else {
      console.log('Connected!')
    }
  });

  
//Handling the request
app.get('/response', (req, res, next) => {
    const isEmpty = (value) => value === ""; //checks whether the input query is empty
    if (Object.values(req.query).every(isEmpty)) {
        res.send("Please input at least one value!")
    } else {
        let toSql = qh.queryHandler(req.query.ul_name, req.query.label); //transforms the query into SQL statement
        let jsonResponse;
        client.query(toSql, (err, response) => { //passes the SQL statement to the database
            console.log(toSql) 
            if (err) {
                console.log(err);
            } else {
                jsonResponse = (qh.responseHandler(response.rows)); 
                //res.sendFile(__dirname+'/public/landing.html');
                res.send(jsonResponse); //returns a respons in JSON format
            };    
        })
        
    }
}) 










app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
})







