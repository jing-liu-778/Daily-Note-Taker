// Dependencies
const path = require("path");
const router = require('express').Router();

    //get route for homepage
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
});
//get route for note page 
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/pages/notes.html'));
})
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
});
module.exports = router;
