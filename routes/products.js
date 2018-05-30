const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});
const uploadCloud = require("../helpers/cloudinary");

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()) return next();
    res.status(403);
    res.send("Epale epale carnal que haces aqui")
  }

//
// 

router.post('/new', uploadCloud.array('image',6), isAuthenticated, (req,res, next)=>{
    req.body.image = [];
    for(let pic of req.files){
    req.body.image.push(pic.url);
}
    //req.user.products = req.user._id;
    req.body.owner =  req.user._id;
    //console.log("Todo lo que viene del front en el formulario de nuevo producto: ",req.body)
    //req.body.currentPrice = 0;
    //req.body.time = Date.now() + Number(req.body.time) * 3600000;
    Product.create(req.body)
    //.populate('user')
    .then(product=>{
        //console.log("El nuevo producto ya hecho y derecho :" + product);
        console.log(req.body)        
        req.user.products.push(product._id);
        User.findByIdAndUpdate(req.user._id, req.user)

        res.json(product)
        // return User.findByIdAndUpdate(req.user._id, req.user)
    })
    // .then(user=>{
    //     console.log(user)
    //     res.redirect('/profile')
    // })
    .catch(e=>next(e))

});

router.get('/',(req,res,next)=>{
    Product.find()
      .populate('owner')
      .populate('lider')
    .then(products=>{
        //console.log('aqui deberian de venir toooooodooooos los productos es el back: ' + products)
        res.json(products);
    })
    .catch(e=>{
        //console.log(e);
        res.send('No funco papu...')
    })
  })


module.exports = router;