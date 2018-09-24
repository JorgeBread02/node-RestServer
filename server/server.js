require ('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require ('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//configuracion global de rutas
app.use (require('./routes/index'));
// habilitar la carpeta public para que se acceda
app.use (express.static(path.resolve(__dirname,'../public')))


mongoose.connect(process.env.urlDB, { useNewUrlParser: true }, (err, res) => {
 
    if (err) throw err;
 
    console.log('Base de Datos ONLINE');
 
});



/*mongoose.connect(process.env.URLDB,(err,res)=>{
if(err)throw err;
console.log('Base de datos ONLINE');
});*/

 
app.listen(process.env.PORT ,()=>{
    console.log('Escuchando puerto:',process.env.PORT )

    
})