const {PrismaClient}=require('@prisma/client');  
const db=new PrismaClient();  
db.stream.updateMany({where:{isLive:true},data:{isLive:false}}).then(function(r){console.log('Reset',r.count,'streams');}).catch(console.error).finally(function(){db.();});  
