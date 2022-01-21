// Dependencies
const express = require("express");
const apiroutes = require('./routes/apiroutes')
const htmlroutes= require('./routes/htmlroutes')

// Express configuration
//Tells node that we are creating an 'express' server
const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES
// require('./routes/apiroutes')(app);
// require('./routes/htmlroutes')(app);
app.use('/api', apiroutes);
app.use('/',htmlroutes)
app.listen(PORT, ()=>{
    console.log(`App listening on PORT: http://localhost:${PORT}`)});