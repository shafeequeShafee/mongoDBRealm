//https://www.mongodb.com/docs/realm/web/manage-email-password-users/
//https://www.mongodb.com/docs/realm/sdk/node/examples/authenticate-users/#email-password-user

//https://stackoverflow.com/questions/62316114/do-i-understand-mongodb-realm-correctly
//https://www.mongodb.com/docs/realm-sdks/js/latest/Realm.App.html#emailPasswordAuth

//https://medium.com/@sourabhbagrecha/configure-email-password-authentication-on-mongodb-realm-a377c34f9b4a

//https://medium.com/@sourabhbagrecha/implement-email-password-authentication-in-react-using-mongodb-realm-a6dc9123802b



const Realm = require("realm");
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')

const app = new Realm.App({ id: "rdbproductservice-vlcgo" });
const credentials = Realm.Credentials.anonymous();


const {userModel} = require("../model/userModel")

const login = async (req, res) => {
    try {
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        // user.
        const user = await app.logIn(credentials);
        var token = user.refreshToken;
        var decoded = jwt_decode(token);
        // console.log("decoded", decoded.sub);
        // console.log(token);
        console.log("Successfully logged in!", user.id);
        var userObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            token: token,
            decoded: decoded,
            msg: user.profile.email + " is successfully logged in"
        }
        // user.id
        // console.dir(userObj);
        res.send(userObj);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}



const SigningUp = async (req, res) => {
   
    // const user = new userModel(req.body)
    try {
        console.log(req.body)
        await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        // Create an email/password credential
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const user = await app.logIn(credentials);
        userObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            msg: user.profile.email + " is successfully registered",
            token: user.accessToken
        }
        console.log("Successfully logged in!", user.id);
        console.dir(userObj);
        res.send(userObj);
    }
    catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
}



const logout=async(req, res, next)=> {
    try {
        //  var currentUser = await app.currentUser;
        // var userObj = {
        //     id: currentUser.id,
        //     email: currentUser.profile.email,
        //     identities: currentUser.identities,
        //     state: currentUser.state,
        //     msg: currentUser.id + " is successfully logged out"
        // }
        await app.allUsers[app.currentUser.id].logOut();
        res.send('logout sucessfully')
      
    } catch (err) {
        console.error("Failed to log out", err.message);
        res.send("failed to log out" + err.message);
    }
}

const deleteCurrentUser=async(req, res)=> {
    var deletedUser =await app.deleteUser(app.currentUser)
    console.log(deletedUser)
    // var resultObj = {
    //     id: deletedUser.id,
    //     email: deletedUser.profile.email,
    //     identities: deletedUser.identities,
    //     state: deletedUser.state
    // }
    console.log("Current User" + 'resultObj');
    res.send('deleted');
}
const removeCurrentUser=async(req, res)=> {
    var removeCurrent =await app.removeUser(app.currentUser)
    console.log(removeCurrent)
    // var resultObj = {
    //     id: deletedUser.id,
    //     email: deletedUser.profile.email,
    //     identities: deletedUser.identities,
    //     state: deletedUser.state
    // }
    console.log("Current User" + 'resultObj');
    res.send('removed');
}


const test=(req, res)=> {

    try {
        console.log("hiiiii test")
       res.send("ok")
    } catch (error) {
        res.send(error.message);
    }

}




////// anonymous user login
const anonymousLogin=async(req, res)=> {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        var x = user.accessToken;
        var userObj = {
            id: user.id,
            identities: user.identities,
            state: user.state,
            refreshToken: user.refreshToken,
            accessToken: user.accessToken,
        }
        console.log("Successfully logged in!", user.id);
        console.dir(userObj);
        res.send(userObj);
    } catch (err) {
        console.error("Failed to log in", err.message);
        res.send("failed to log in" + err.message);
    }
}


const logedInUser=async(req, res)=> {
    var logedInUser = await app.currentUser;
    var resultObj = {
        id: logedInUser.id,
        email: logedInUser.profile.email,
        identities: logedInUser.identities,
        state: logedInUser.state
    }
    console.log("Current User" + resultObj);
    res.send(resultObj);
}



module.exports = {
    login,
    SigningUp,
    logout,
    test,
    anonymousLogin,
    logedInUser,
    deleteCurrentUser,
    removeCurrentUser
}