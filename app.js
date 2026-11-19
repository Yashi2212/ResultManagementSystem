require('dotenv').config();
const express= require('express');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayout = require('express-ejs-layouts');
const connectDB=require('./server/config/db');
const methodOverride =require('method-override');
const cookieParser=require('cookie-parser');
const app = express();

const mongoose= require('mongoose');
const port = process.env.PORT || 3000;


app.use(cookieParser());

//connect to database
connectDB();
mongoose.set('debug', true);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


//static files
app.use(express.static('public'));

//templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');

app.use(bodyParser.json());
app.set('view engine','ejs');

//express Session
app.use(session({
    secret: require('./server/config/session-secret'),
    resave: false,  // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store. 
    cookie:{
        maxAge:1000*60*60*24*7 ,//1 week
    }
}));



//flash Message
// app.use(flash({sessionKeyName:'flashMessage'}));
app.use(flash());


// Set up a middleware to make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.info_msg = req.flash('info_msg');
    next();
  });

//CORS Middleware
const cors = require('cors');
const { route } = require('./server/routes/teacher');
app.use(cors());


//Routes
app.use('/',require('./server/routes/teacher'))
app.use('/',require('./server/routes/student'))


//Handle 404
app.get('*',(req,res)=>{
    res.status(404).render('404');
});

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
});
