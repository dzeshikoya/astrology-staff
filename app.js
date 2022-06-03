if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }



const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
//const ejsLint = require('ejs-lint');
const Datastore = require('nedb');
db = new Datastore({filename : 'users'});
db.loadDatabase();

app.use(express.static('public'));
app.use(express.static('view'));

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


const users = []

db.find({ }, function (err, docs) {
  docs.forEach(function(d) { 
  users.push({
    id: d.id,
    name: d.name,
    email:  d.email,
    birthdate: d.birthdate,
    password: d.password
  }) 
//console.log( d.name+ d.birthdate);
  }); 
  
});


app.set('view-engine', 'ejs')
app.engine('ejs', require('ejs').__express)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/logged', checkAuthenticated, (req, res) => {
  res.render('logged.ejs', { name: req.user.name,birthdate: req.user.birthdate})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/logged',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

const tempusers = []

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    tempusers.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      birthdate: req.body.birthdate,
      password: hashedPassword
    })
    db.insert(tempusers,function(err, docs){
    });

    db.findOne({ email: req.body.email }, function(err, d) { 
      users.push({
        id: d.id,
        name: d.name,
        email:  d.email,
        birthdate: d.birthdate,
        password: d.password
      }) 
    }); 

    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/')
  })
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/logged')
  }
  next()
}


app.listen(4000, function(){
    console.log('Server started on port 4000');
});