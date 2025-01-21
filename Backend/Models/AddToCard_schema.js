const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
     
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    image:{
      type:String,
      required:true

    },
    Add_By:{type:String},
    id:{type:String},
    quantity:{type:Number,
      default:1
    }
  });

  const Card_schema =  mongoose.model("AddToCard", CardSchema);
  module.exports = Card_schema;


