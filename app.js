const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

require('./config/passport')(passport);
const app = express();
app.set('view engine', 'ejs')



//mongoose connection
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const dbConnection = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const Exercise = require('./models');

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use(express.static(__dirname + '/public'));


let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});





