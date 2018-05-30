const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  userid:{
    type:Schema.Types.ObjectId,
    ref: "User"
  },
  body: String 
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


  module.exports  = mongoose.model('Comment', commentSchema);
