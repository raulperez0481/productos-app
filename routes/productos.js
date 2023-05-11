const express = require('express')
const router = express.Router()

router.get('/ver', (req, res)=>{
    req.app.locals.db.collection('productos').find().toArray((err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/crear', (req, res)=>{
    console.log(req.body);
    req.app.locals.db.collection('productos').insertOne(req.body, (err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.redirect('/usuarios/gestion?mensaje=Producto añadido');  
        }
    })
})

router.delete('/borrar', (req, res)=>{
    req.app.locals.db.collection('productos').deleteOne({nombre: req.body.nombreProducto}, (err, data)=>{
        if(err !== undefined){
            throw new Error(err)
        } else {
            res.send(data)
        }
    })
})

module.exports = router;