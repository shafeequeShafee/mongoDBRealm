//egenneyum eyutham
// let userController= require("../controller/userController");
// routerUser.post('/login').get(userController.login)

const express = require('express')
const userRouter =express.Router()
const {login,SigningUp,logout,test}=require("../controller/userController")
const {auth}=require("../middleware/auth")

userRouter.post('/login',login)
userRouter.post('/signingUp',SigningUp)
userRouter.post('/logout',auth,logout)
userRouter.post('/test',auth,test)
// userRouter.post('/sendMail',sendTestEmail)
// userRouter.post('/logOut',auth,logOut)
// userRouter.post('/logOutAll',auth,logOutAll)
// userRouter.get('/getUserDetails/me',auth,getUserDetails)
// userRouter.delete('/deleteUserDetails/:id',auth,deleteUserDetails)




module.exports= userRouter