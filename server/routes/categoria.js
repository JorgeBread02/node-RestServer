const express = require ('express');
let {VerificaToken,verificaAdmin_Role} =require('../middlewares/autenticacion');
let app= express();
let Categoria = require('../models/categoria');
//============================
//Mostrar todas las categorias
//============================
app.get('/categoria',VerificaToken,(req,res)=>{

    let desde=req.query.desde||0;
    desde=Number(desde);
    
    let limite =req.query.limite||5;
    limite=Number(limite);
   
   
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .skip(desde)
    .limit(limite)
    .exec((err,categorias)=>{
      if(err){
        return  res.status(400).json({
       
             ok:false,
          err
           
           });
     }
     Categoria.count((err, conteo)=>{
        res.json({
          ok:true,
          categorias,
          cuantos:conteo
        });
       })
      
      })





});
//===================================
//Mostrar todas las categorias por ID
//===================================
app.get('/categoria/:id',(req,res)=>{
    let id = req.params.id;
Categoria.findById(id,(err,categoriaDB)=>{
    if(err){
        return  res.status(400).json({
       
             ok:false,
          err
           
           });
     }


     if(!categoriaDB){
        return  res.status(400).json({
       
            ok:false,
         err:{
             message:'ID no encontrado'
         }
          
          });
     }
     res.json({
         ok:true,
     categoria:categoriaDB
     })
});


});
//============================
//Crear nueva categoria
//============================
app.post('/categoria',VerificaToken,(req,res)=>{
    let body=req.body;
//regresa nueva categoria
let categoria= new Categoria ({
descripcion:body.descripcion,
usuario:req.usuario._id
});
 categoria.save((err,categoriaDB)=>{
    if(err){
       return  res.status(500).json({
      
            ok:false,
         err
          
          });
    }
    
 if(!categoriaDB){
    return  res.status(400).json({
   
         ok:false,
      err
       
       });
 }
 
    
    res.json({
    
        ok:true,
        categoria:categoriaDB
    });
    
    });


});

//============================
//Actualiza las categorias
//============================
app.put('/categoria/:id',VerificaToken,(req,res)=>{

    let id = req.params.id;
    let body=req.body;
    let descCategoria={
        descripcion:body.descripcion
    }
  
   Categoria.findByIdAndUpdate(id,descCategoria,{new:true,runValidators:true},(err,categoriaDB)=>{
    if(err){
      return  res.status(500).json({
     
           ok:false,
        err
         
         });
   }
   if(!categoriaDB){
    return  res.status(400).json({
   
         ok:false,
      err
       
       });
 }

    res.json({
      ok:true,
      categoria:categoriaDB
      
    })
  })
  
  });
  



//============================
//Mostrar todas las categorias
//============================
app.delete('/categoria/:id',[VerificaToken,verificaAdmin_Role],(req,res)=>{
    //solo un admin borra categorias
    let id=req.params.id;
    Categoria.findByIdAndRemove(id,(err,categoriaDB)=>{
        if(err){
          return  res.status(500).json({
         
               ok:false,
            err
             
             });
       }
      
       if(!categoriaDB){
        return  res.status(400).json({
       
             ok:false,
          err:{
            message:'El id no existe'
          }
           
           });
      }
      res.json({
        ok:true,
       message:'categoria borrada'
      })
      
      })

});



module.exports = app;

