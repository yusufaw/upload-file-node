var express = require("express");
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './uploads'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now())
});
var upload = multer({
    storage: storage
}).single('file');

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.post('/api/photo', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }

        res.end("File is uploaded");
    });
});

app.post('/api/tes', (req, res) => {
    console.log(req.body.tes);
    res.send({
        "tes": "Huahahahaha"
    });
});

app.listen(3000, () => console.log("Working on port 3000"));
