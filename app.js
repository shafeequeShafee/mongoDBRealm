//npm install --save realm

const Realm = require("realm");
const app = new Realm.App({ id: "rdbproductservice-vlcgo" });
const credentials = Realm.Credentials.anonymous();



const allProducts = async() =>{
    try {
        const user = await app.logIn(credentials);
        ///Promise { <pending> }  vennappo njan .then koduthu
        const Products = user.functions.getAllProducts().then(function(result) {
            console.log(result) 
         })
        
    } catch(err) {
        console.error("Failed to log in", err);
      }
}

const getOneProdiuct = async() =>{
    try {
        const user = await app.logIn(credentials);
        ///Promise { <pending> }  vennappo njan .then koduthu
        const Products = user.functions.getOneProduct("6381855e5127f6e171a733b0").then(function(result) {
            console.log(result) 
         })
        
    } catch(err) {
        console.error("Failed to log in", err);
      }
}

////    Search in mondoDBAtlas  //////////////////

/// atlas dashboardil => browse collections => Search => Create Search Index => Visual Editor



// ethil etha choichal eth full text searchannu , aa word full indekil mathram result kittukayollu
const searchProductsfullSearch = async() =>{
    try {
        const user = await app.logIn(credentials);
        ///Promise { <pending> }  vennappo njan .then koduthu
        const Products = user.functions.searchProductsfullSearch("hat").then(function(result) {
            console.log(result) 
         })
        
    } catch(err) {
        console.error("Failed to log in", err);
      }
}



//// fuzzy add cheyumbol fullword type cheyathae result kittum
const searchProductsfullSearchWithfuzzy = async() =>{
    try {
        const user = await app.logIn(credentials);
        ///Promise { <pending> }  vennappo njan .then koduthu
        const Products = user.functions.searchProductsfullSearchWithfuzzy("mongo").then(function(result) {
            console.log(result) 
         })
        
    } catch(err) {
        console.error("Failed to log in", err);
      }
}


/////autocomplete allekil partial search
// athyam poyit puthiya oru index create cheyukkaa
// ey timil json editor use cheytha create cheythath
//index name  : autoCompleteProducts
// {
//     "mappings": {
//       "dynamic": false,
//       "fields":{
//         "name":[
//           {
//             "foldDiacritics":false,
//             "maxGrams":7,
//             "minGrams":3,
//             "tokenization":"edgeGram",
//             "type":"autocomplete"
//           }]
//       }
//     }
//   }

const autoCompleteProductsSearch = async() =>{
    try {
        const user = await app.logIn(credentials);
        ///Promise { <pending> }  vennappo njan .then koduthu
        const Products = user.functions.autoCompleteProductsSearch("hood").then(function(result) {
            console.log(result) 
         })
        
    } catch(err) {
        console.error("Failed to log in", err);
      }
}


// allProducts()
// getOneProdiuct()
// searchProductsfullSearch()
//searchProductsfullSearchWithfuzzy()
// autoCompleteProductsSearch()









///thazhaa njan athyam cheythath nd ////////////




// const fullSearch=async(req,res)=>{
//     try{

//         const todos =await Todos.find(

//             ////  full text search  /////////////////////
//             // {$text : {$search:"shafeeque"}}

//             // {User:"Vishnuettan"}


//             /////////  partial search ///////////
        
//                 {
//                   User:{
//                     $regex : new RegExp('sha')
//                   }
//                 }
             
//          )
//         console.log(todos)
//     }
//     catch (error) {
//         console.error(error);
//         res.render("400");
//     }  
// }
