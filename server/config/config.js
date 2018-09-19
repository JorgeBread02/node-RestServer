
//Puerto

process.env.PORT =process.env.PORT ||3000;
//Entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';
//BASE DE DATOD

let urlDB;
if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/cafebar'
}else{

    urlDB='mongodb://cafeuser:Jorge75432560@ds163382.mlab.com:63382/cafebar'
}
process.env.URLDB=urlDB;