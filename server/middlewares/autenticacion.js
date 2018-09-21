const jwt =require('jsonwebtoken')

//=========
//Verificar token
//==========
let VerificaToken=(req,res,next)=>{
let token=req.get('token') 

jwt.verify(token,process.env.SEED,(err,decoded)=>{


    if(err){
        return res.status(401).json({
            ok:false,
            err:{
                message:'token no valido amigaso'
            }
        });
    }
    req.usuario=decoded.usuario;
    next();
});


};


let verificaAdmin_Role=(req,res,next)=>{
let usuario=req.usuario;
if(usuario.role==='ADMIN_ROLE'){
next();

}else{
   return res.json({
        ok:false,
        err:{
            message:'El usuario no es un administrador'
        }
    })

}


}

module.exports={
    VerificaToken,
    verificaAdmin_Role
}