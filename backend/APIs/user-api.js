//create user app
const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()

let usercollection;
let bookscollection;
//get usercollection app
userApp.use((req,res,next)=>{
  usercollection=req.app.get('userscollection')
  bookscollection=req.app.get('bookscollection')
  next()
})

//user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
  //get user resource from client
  const newUser=req.body;
  //check for tht duplicate user based on the username
  const dbuser=await usercollection.findOne({username:newUser.username})
  //if user found in db
  if(dbuser!=null){
    res.send({message:"user already existed"})
  }
  else{
    //hash the password
    const hashedPassword=await bcryptjs.hash(newUser.password,6)
    //replace plain password with the hashed password
    newUser.password=hashedPassword;
    //create user
    await usercollection.insertOne(newUser)
    //send res
    res.send({message:"user created"})
  }

}))


//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
  //get the obj from client
  const userCred=req.body;
  //check for the username
  const dbuser=await usercollection.findOne({username:userCred.username})
  if(dbuser==null){
    res.send({message:"Invalid username"})
  }
  else{
    //check for password
    const status=await bcryptjs.compare(userCred.password,dbuser.password)
    if(status==false){
      res.send({message:"invalid password"})
    }
    else{
      //create jwt token and encode it
      const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:20})
      //send response
      res.send({message:"login success",token:signedToken,user:dbuser})
    }
  }

}))

//get articles of all the authors
userApp.get('/books',expressAsyncHandler(async(req,res)=>{
  //get bookscollection from express app
  const bookscollection=req.app.get('bookscollection')
  //get all books
  let booksList=await bookscollection.find().toArray()
  //send response
  res.send({message:"books",payload:booksList})
}))

//writing the comments

// userApp.post('/comment',verifyToken,expressAsyncHandler(async(req,res)=>{
//   //get user comment db
//   const userComment=req.body;
//   //insert userComment object to comments array of articels by id
//   let result=await bookscollection.updateOne({bookId:userComment.bookId},{$addToSet:{Comments:userComment}})
//   console.log(result)
//   res.send({message:"comment posted"})

// }))


//post comments for an arcicle by atricle id
userApp.post("/comment/:bookId",verifyToken,
  expressAsyncHandler(async (req, res) => {
    //get user comment obj
  
    const userComment = req.body;


    const articleIdFromUrl=(+req.params.bookId)
  
    //insert userComment object to comments array of article by id
    let result = await bookscollection.updateOne(
      { articleId: articleIdFromUrl},
      { $addToSet: { comments: userComment } }
    );
    console.log(result)

    res.send({ message: "Comment posted" });
  })
);

//export userApp
module.exports = userApp;




//export user-api
module.exports=userApp;