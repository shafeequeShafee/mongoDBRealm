const Realm = require("realm");
const app = new Realm.App({ id: "rdbproductservice-vlcgo" });
const jwt_decode = require('jwt-decode');

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt_decode(token);
        // console.log("decoded", decoded.sub);
        var userId = decoded.sub;
        // const current_Users =await app.currentUser;
        // console.log('currentUsers',current_Users)
        const all_Users = await app.allUsers;
        // console.log('allUsers',all_Users);
        const loggedInUser = await app.allUsers[userId];
        // console.log("userId",userId)
        console.log("LoggeduserId", loggedInUser.state)
        // console.log("",loggedInUser.state)
        if (loggedInUser != undefined && loggedInUser.id == userId && loggedInUser.state === 'LoggedIn') {
            console.log("user is authenticated");
            next();
        }
        else {
            console.log("user is not authenticated");
            res.send("user is not authenticated");
        }
    } catch (error) {
        console.log(error);
        res.send(error.meassage);
    }

}

module.exports = {
    auth
}