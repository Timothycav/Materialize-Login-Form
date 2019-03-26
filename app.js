const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose');

const app = express();

// Load User Model
require('./models/User');
const User = mongoose.model('users');

const users = require('./routes/users')
//passport config
require('./config/passport')(passport);
//DB config
const db = require('./config/database');

mongoose.connect(db.mongoURI, {
    useMongoClient: true,
    useNewUrlParser: true
}) 
.then(() => console.log('MongoDB Connected . . .'))
.catch(err => console.log(err));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

app.get('/', (req, res) => {
    const title = 'Log In or Sign Up';

    res.render('index', {
        title: title,
        
    });
});

app.get('/welcome', (req,res) => {
   res.render('welcome')
    })

    app.use('/users', users);

    const port = process.env.PORT || 5051;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});