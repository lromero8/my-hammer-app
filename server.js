const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const User = require('./models/User');
const authorize = require("./middlewares/auth");
const { check, validationResult } = require('express-validator');



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
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/my-hammer-test`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });



/* ------------------- SIGN-UP -------------------- */

app.post("/api/signup",
  [
    check('name')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    check('email', 'Email is required')
        .not()
        .isEmpty(),
    check('password', 'Password should be between 5 to 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 8 })
],
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
        // return res.status(404).send({ message: "User Not found." });
        // return res.status(401).json({ message: 'Not found' })
    }
    else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
    }
});
/* ------------------- SIGN-UP -------------------- */

/* ------------------- SIGN-IN -------------------- */

app.post("/api/signin", (req, res) => {
    // console.log(req.body)
    User.findOne({
        email: req.body.email
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        let jwtToken = jwt.sign({
            email: user.email,
            userId: user._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: user._id
        });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
});

/* ------------------- SIGN-IN -------------------- */


/* ------------------- GET USERS -------------------- */

app.get('/api/users', async (request, response) => {
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

/* ------------------- GET USERS -------------------- */



/* ------------------- DASHBOARD -------------------- */

app.get('/api/dashboard/:id', authorize, (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

/* ------------------- DASHBOARD -------------------- */




// /* ------------------- POST USER -------------------- */


// app.post("/api/user", (req, res) => {

//     var myData = new User(req.body);
//     myData.save()
//         .then(item => {
//             // res.send("User saved to database");
//             res.status(200).json({
//                 status: 200,
//                 msg: 'User saved to database',
//             });
//         })
//         .catch(err => {
//             res.status(400).send("Unable to save to database");
//         });

// })

// /* ------------------- GET USER -------------------- */

// app.get("/api/user", async (request, response) => {

//     try {
//         var result = await User.find().exec();
//         response.send(result);
//         // response.status(200).json(result);
//         // console.log(result)
//         // response.send("It works");
//     } catch (error) {
//         response.status(500).send(error);
//     }

// });