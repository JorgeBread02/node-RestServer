
//Puerto

process.env.PORT =process.env.PORT ||3000;
//Entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';


//Vencimiento del token
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = '48h';

//seed de autenticacion
process.env.SEED=process.env.SEED||'este-es-el-seed-desarrollo'


//BASE DE DATOs


let urlDB;
if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/cafebar'
}else{

    urlDB=process.env.MONGO_URI;
}
process.env.URLDB=urlDB;

//GOOGLE CLIENT ID

process.env.CLIENT_ID =process.env.CLIENT_ID || '1048561714366-6hi0t97uvq7rrskl4ba54o9j09quo49m.apps.googleusercontent.com'
