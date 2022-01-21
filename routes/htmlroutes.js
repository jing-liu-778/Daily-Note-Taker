// Dependencies
const path = require("path");

// Routing

module.exports = function (app){


    //get route for homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
});
//get route for note page 
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'));
})

};

