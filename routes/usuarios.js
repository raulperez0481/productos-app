const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true 
}));

function requireLogin(req, res, next) {
  if (req.session.user) {
    console.log('ID de sesión:', req.sessionID);
    next();
  } else {
    res.redirect('/usuarios/login');
  }
}

router.get('/gestion', requireLogin, (req, res) => {
  res.render('gestion');
});

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  const error = req.query.error; // Capturamos el mensaje de error en caso de que se haya pasado como parámetro
  res.render('login', { error }); // Pasamos el mensaje de error como variable a la vista login.ejs
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/usuarios/login');
    });
  });

router.get('/ver', (req, res)=>{
  req.app.locals.db.collection('usuarios').find().toArray((err, data)=>{
    if(err !== undefined){
      throw new Error(err)
    } else {
      res.send(data)
    }
  })
});

router.post('/crear', (req, res)=>{
  console.log(req.body);
  req.app.locals.db.collection('usuarios').insertOne(req.body, (err, data)=>{
    if(err !== undefined){
      throw new Error(err)
    } else {
      res.send(data)
    }
  })
});

router.delete('/borrar', (req, res)=>{
  req.app.locals.db.collection('usuarios').deleteOne({user: req.body.user}, (err, data)=>{
    if(err !== undefined){
      throw new Error(err)
    } else {
      res.send(data)
    }
  })
});

router.put('/editar', (req, res)=>{
  req.app.locals.db.collection('usuarios').updateOne({user: req.body.user},{$set:{pass: req.body.pass}},(err, data)=>{
    if(err !== undefined){
      throw new Error(err)
    } else {
      res.send(data)
    }
  })
});

router.post('/login', (req, res) => {
  const { user, pass } = req.body;
  findUser(req, user, pass, (err, user) => {
    if (err) {
      res.status(500).send('Error al buscar el usuario');
    } else if (!user) {
      res.redirect('/usuarios/login?error=Nombre de usuario o contraseña incorrectos');    
    } else {
        req.session.user = {
            id: user._id,
            name: user.name
        };
      res.redirect('/usuarios/gestion');
    }
  });
});

function findUser(req, user, pass, callback) {
  req.app.locals.db.collection('usuarios').findOne({ user }, (err, user) => {
    if (err) {
      callback(err, null);
    } else if (!user) {
      callback(null, null);
    } else {
      bcrypt.compare(pass, user.pass, (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res) {
          callback(null, user);
        } else {
          callback(null, null);
        }
      });
    }
  });
}

module.exports = router;
