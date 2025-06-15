//create admin app
const exp=require('express')
const adminApp=exp.Router()


adminApp.get('/test-admin',(req,res)=>{
  res.send({message:"this is form adminApp"})
})


//export admin-api
module.exports=adminApp;