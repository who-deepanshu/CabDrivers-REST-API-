const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


// connect to database
const mongoURI = 'mongodb://localhost/cabDriver';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start listening to a port once the connection is established
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });

mongoose.Promise = global.Promise;


// middleware
// app.use(express.static('public'));         // to serve static files
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
// error handling 
app.use(function(err, req, res, next){
    res.status(422).send({error : err.message});
});

app.listen(process.env.port || 4000, function(){
    console.log('at 4000....');
});
