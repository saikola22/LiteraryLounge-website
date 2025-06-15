//create express app
const exp=require('express');
const app=exp()
const cors = require('cors');
require('dotenv').config();
const mongoClient=require('mongodb').MongoClient;
const path=require('path')


//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../frontend/my-react-app/build')))


app.use(cors()); // allows all origins

//to parse the body of req
app.use(exp.json())

//connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
  //get db obj
  const blogdb=client.db('blogdb')
  //get collection obj
  const userscollection=blogdb.collection('userscollection')
  const bookscollection=blogdb.collection('bookscollection')
  const authorscollection=blogdb.collection('authorscollection')
  //share collection obj
  app.set('userscollection',userscollection)
  app.set('bookscollection',bookscollection)
  app.set('authorscollection',authorscollection)
  //conform db connection status
  console.log("DB connecion success")
})
.catch(err=>console.log("Err on DB connection",err))
//import routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')



//if path starts with user-api ,send req to userApp
app.use('/user-api',userApp)
//if path starts with user-api ,send req to authorApp
app.use('/author-api',authorApp)
//if path starts with user-api ,send req to adminApp
app.use('/admin-api',adminApp)

// app.use('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../frontend/my-react-app/build/index.html'))
// })


//express error handlers
app.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message})

})

app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/my-react-app/build/index.html'))
})






//assign port number
const port=process.env.PORT || 5000;
app.listen(port, () => console.log(`web server is on port ${port}`))