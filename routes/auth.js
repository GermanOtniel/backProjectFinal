const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const Product = require("../models/Product");
const multer = require("multer");
const upload = multer({dest: './public/uploads'});
const uploadCloud = require("../helpers/cloudinary");


function isAuthenticated(req,res,next){
  if(req.isAuthenticated()) return next();
  res.status(403);
  res.send("Epale epale carnal que haces aqui")
}


router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  return res.json(req.user);
})

router.post('/signup', (req,res)=>{
        User.register(req.body, req.body.password, function(err, user) {
            if (err) return res.json(err);
              res.json(user);
            })
})

//, isAuthenticated

router.get('/logout' ,(req,res)=>{
  req.logout();
  res.status(200);
  res.send('Sesión finalizada')
})

      


router.get('/profile/:id' ,(req,res)=>{
  User.findById(req.params.id)
  .populate('products')
  .then(user=>{
    //console.log(user);
    res.json(user);
  })
})



router.post('/profile',(req,res, next)=>{
  console.log(req.body);

  //req.body.profilePic = req.file.url;
  //console.log(req.user);
  //console.log(req.body.bio)
  User.findByIdAndUpdate(req.user._id, req.body, {new:true})
  .then(user=>{
      //console.log(body);
      res.json({message:"Creditos agregados papi"});
      //user.message = "Actualizado";
  })
  .catch(e=>next(e));
});
      

function homeAuth(req,res,next){
  if(req.isAuthenticated()){
      Product.find()
      .populate('lider')
      .then(product=>{
          return res.send('Estas en el inicio autenticado')
      //    esto va dentro del res send que antes era render checa subappi por cualquier duda--> , {
      //     product,
      //     user:req.user
      //  }
      }) 
  }else{
      Product.find()
      .populate('lider')
      .then(product=>{
          return res.send('Estas en el inicio NO autenticado')
          // esto iba dentro de el res render checa el ejemplo de subappi por cualquier problema -->  , {product}
      })
  }
      
}



router.get('/', homeAuth);



module.exports = router;
