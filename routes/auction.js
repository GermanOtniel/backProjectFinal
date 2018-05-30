const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});
const Comentario = require('../models/Comment');


router.get('/:_id', (req,res,next)=>{
  
  Product.findById(req.params)
  .populate('owner')
  .populate('lider')
    .then(product=>{
      res.json(product)
    })
    .catch(e=>next(e));
  
});

router.post('/:_id/comments/new',(req,res,next) => {
  Comentario.create({
      userid:req.user,
      body: req.body.body
  })
  .then(comentario=>{
    console.log(comentario);
        //console.log(req.user)
        console.log(req.product)        
        
        Product.findByIdAndUpdate(req.params._id, {$push: {comment: comentario._id}})
        .then(()=>{
          res.json(comentario)
        })
        // return User.findByIdAndUpdate(req.user._id, req.user)
      // Product.findByIdAndUpdate(req.params,{$push:{comment:comentario}})
      // .then(product=>{
      //     res.json(product)
      // })
      // .catch(e=>console.log(e))

     
  })
  .catch(e=>console.log(e))

});

module.exports = router;