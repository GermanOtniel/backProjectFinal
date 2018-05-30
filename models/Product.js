const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  initPrice: Number,
  pujaValue: Number,
  description: String,
  time: Number,
  image:[String],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment:[{
    type:Schema.Types.ObjectId,
    ref: "Comment"
  }],
  lider:{
    type:Schema.Types.ObjectId,
    ref: "User"
  },
  status:[{
    type: String,
    enum: ["Vendido", "Vendiendo"],
    default: "Vendiendo"
  }],
  followers:[{
    type:Schema.Types.ObjectId,
    ref: "User"
  }]
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


  module.exports  = mongoose.model('Product', productSchema);
