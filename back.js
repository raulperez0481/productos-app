const express = require('express');
const mongodb = require('mongodb-legacy');

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Configurar la carpeta 'views' como carpeta de vistas
app.set('views', __dirname + '/views');


const usuarios = require('./routes/usuarios');
app.use('/usuarios', usuarios);

const productos = require('./routes/productos');
app.use('/productos', productos);


const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017',(err, client)=>{
  if(err !== undefined){
    console.log(err);
  } else {
    app.locals.db = client.db('cesta');
  }
});

app.listen(3000, ()=>{
  console.log('Servidor levantado en el puerto 3000');
});

