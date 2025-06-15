//create author app
const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()

let authorscollection;
//get authorscollection app
authorApp.use((req,res,next)=>{
  authorscollection=req.app.get('authorscollection')
  bookscollection=req.app.get('bookscollection')
  next()
})

//author registration route
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
  //get user resource from client
  const newAuthor=req.body;
  console.log("author registration")
  //check for tht duplicate author based on the username
  const dbauthor=await authorscollection.findOne({username:newAuthor.username})
  //if author found in db
  if(dbauthor!==null){
    res.send({message:"author already existed"})
  }
  else{
    //hash the password
    const hashedPassword=await bcryptjs.hash(newAuthor.password,6)
    //replace plain password with the hashed password
    newAuthor.password=hashedPassword;
    //create user
    await authorscollection.insertOne(newAuthor)
    //send res
    res.send({message:"author created"})
  }

}))


//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
  //get the obj from client
  const authorCred=req.body;
  //check for the username


  const dbauthor=await authorscollection.findOne({username:authorCred.username})


  if(dbauthor===null){
    res.send({message:"Invalid auhtorname"})
  }
  else{
    //check for password
    const status=await bcryptjs.compare(authorCred.password,dbauthor.password);
  


    if(status===false){
      res.send({message:"invalid password"})
    }
    else{
      //create jwt token and encode it
      const signedToken=jwt.sign({username:dbauthor.username},process.env.SECRET_KEY,{expiresIn:'1d'})
      //send response
      res.send({message:"login success",token:signedToken,user:dbauthor})
    }
  }

}))


//adding new book  by author
authorApp.post('/book',verifyToken,expressAsyncHandler(async(req,res)=>{
  //get new book from client
  const newBook=req.body;
   await bookscollection.insertOne(newBook)
   console.log(newBook)
   res.send({message:"new article created"})
}))


//modify the book
authorApp.put('/book',verifyToken,expressAsyncHandler(async(req,res)=>{
  const modifiedBook=req.body;
  let result=await bookscollection.updateOne({bookId:modifiedBook.bookId},{$set:modifiedBook})
  console.log(result)
  res.send({message:"book modified"})
  
}))






//delete an article by article ID

authorApp.put('/book/:bookId',verifyToken,expressAsyncHandler(async(req,res)=>{
  //get articleId from url
  const artileIdFromUrl=(+req.params.bookId);
  //get article 
  const articleToDelete=req.body;

  if(articleToDelete.status===true){
     let modifiedArt= await bookscollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
     res.send({message:"article deleted",payload:modifiedArt.status})
  }
  if(articleToDelete.status===false){
      let modifiedArt= await bookscollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
      res.send({message:"article restored",payload:modifiedArt.status})
  }
 
 
}))


//read articles of author
authorApp.get('/books/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
  //get author's username from url
  const username=req.params.username;
  console.log("in the read articles")
  //get atricles whose status is true
  const artclesList=await bookscollection.find({username:username}).toArray()
  console.log(artclesList)
  res.send({message:"List of atricles",payload:artclesList})

}))

//export author-api
module.exports=authorApp;