const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name:  {
    type:String,
    required:true
  },
  lastName:  {
    type:String,
    required:true
  },
  phoneNumber:Number,
  bio: String,
  profilePic:String,
  rating: {
    type: Number,
    default:1
  },
  creditos: {
    type:Number,
    default:0
  },
  email: {
    type:String,
    required:true
  },
  products:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  myProducts:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
  prodFoll:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }]
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  userSchema.plugin(PassportLocalMongoose, {
    usernameField:"email"
  });
  
  module.exports = mongoose.model('User', userSchema);
 
