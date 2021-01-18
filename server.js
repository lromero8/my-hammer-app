const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
var User = require('./models/User');


const app = express();

app.use(bodyParser.json());
app.use(cors())

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Heroku Config Vars 

// MongoDB cluster connection string
// mongodb+srv://<dbname>:<password>@cluster-8rplq1jc.kt4ut.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://lromero:123@cluster0.qyczp.mongodb.net/my-hammer-db?retryWrites=true&w=majority

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });
  
  
/* ------------------- POST USER -------------------- */


app.post("/api/user", (req, res) => {

    var myData = new User(req.body);
    myData.save()
        .then(item => {
            // res.send("User saved to database");
            res.status(200).json({
                status: 200,
                msg: 'User saved to database',
            });
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });

})

/* ------------------- GET USER -------------------- */

app.get("/api/user", async (request, response) => {

    try {
        var result = await User.find().exec();
        response.send(result);
        // response.status(200).json(result);
        // console.log(result)
        // response.send("It works");
    } catch (error) {
        response.status(500).send(error);
    }

});