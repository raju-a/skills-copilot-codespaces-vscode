// Create web server

// Import modules   
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Parse POST data
app.use(bodyParser.json());

// Read the comments.json file
function readComments() {
    const comments = fs.readFileSync('comments.json', 'utf8');
    return JSON.parse(comments);
}

// Write the comments.json file
function writeComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 4));
}

// Get comments
app.get('/comments', (req, res) => {
    const comments = readComments();
    res.json(comments);
});

// Post comments
app.post('/comments', (req, res) => {
    const comments = readComments();
    comments.push(req.body);
    writeComments(comments);
    res.json(comments);
});

// Start server
app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000');
});