const express = require ('express');
const {VerificaToken}=require('../middlewares/autenticacion')
let app= express();
let Producto = require('../models/producto');

//========================
//Obtener Productos
//=========================

app.get('/productos',VerificaToken,(req,res)=>{
    //traer los productos
    //populate usuario y categoria
    //paginado
    let desde=req.query.desde||0;
    desde=Number(desde);
    /*let limite =req.query.limite||5;
    limite=Number(limite);*/

    Producto.find({disponible:true})
    .skip(desde)
    .limit(5)
    .populate('usuario','nombre email')
    .populate('categoria','descripcion')
    .exec((err,productos)=>{
        if(err){
            return  res.status(500).json({
           
                 ok:false,
              err
               
               });
         }
         res.json({
            ok:true,
            productos
        })
   
    

    })



});

//========================
//Obtener un Productos por ID
//=========================

app.get('/productos/:id',(req,res)=>{

    //populate usuario y categoria
    //paginado

    let id= req.params.id;
   Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','nombre')
    .exec(  (err,productoDB)=>{
        if(err){
            return  res.status(500).json({
           
                 ok:false,
              err
               
               });
         }

         if(!productoDB){
            return  res.status(400).json({
           
                 ok:false,
              err:{
                  message:'ID NO EXISTE MANO'
              }
               
               });
         }
         res.json({
            ok:true,
            producto:productoDB
        })
  
  
   





    })
    
  
});

//========================
//Buscar producto
//=========================
app.get('/productos/buscar/:termino',VerificaToken,(req,res)=>{
let termino = req.params.termino;
let regex= new RegExp(termino,'i');

    Producto.find({nombre:regex})
.populate('categoria','nombre')
.exec ((err,productos)=>{
    if(err){
        return  res.status(500).json({
       
             ok:false,
          err
           
           });
     }
     res.json({
         ok:true,
         productos
     })

})
})

//========================
//crear producto
//=========================

app.post('/productos',VerificaToken,(req,res)=>{
    //grabar el usuario
    //grabar una categoria del listado
let body= req.body;
let producto = new Producto({
    usuario: req.usuario._id,
    nombre:body.nombre,
precioUni:body.precioUni,
descripcion:body.descripcion,
 disponible:body.disponible,
   categoria:body.categoria

})
producto.save((err, productoDB)=>{
    if(err){
        return  res.status(500).json({
       
             ok:false,
          err
           
           });
     }



     res.status(201).json({
         ok:true,
         producto:productoDB
     });

});

   
});
//========================
//Actualiza producto
//=========================
app.put('/productos/:id',VerificaToken,(req,res)=>{
    //grabar el usuario
    //grabar una categoria del listado

let id= req.params.id;
let body = req.body;
Producto.findById(id,(err,productoDB)=>{
    if(err){
        return  res.status(500).json({
       
             ok:false,
          err
           
           });
     }
     if(!productoDB){
      return  res.status(400).json({
     
           ok:false,
        err:{
            message:'No existe producto (ID)'
        }
         
         });
   }

productoDB.nombre=body.nombre;
productoDB.precioUni=body.precioUni;
productoDB.categoria=body.categoria;
productoDB.disponible=body.disponible;
productoDB.descripcion=body.descripcion;

productoDB.save((err,productoGuardado)=>{

    if(err){
        return  res.status(500).json({
       
             ok:false,
          err
           
           });
     }
     res.json({
         ok:true,
         producto:productoGuardado
     })

})

})
   
});

//========================
//Borrar producto
//=========================
app.delete('/productos/:id',VerificaToken,(req,res)=>{

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });

        })

    })



});



module.exports=app;