const mongoose = require("mongoose");


const empSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    __id:{
        type:Object
    },
    name: {
        type:String
        // required: true,
    },
    jobtitle: {
        type:String
    },
    salary: {
        type: Number
    },
    address:{
        type: String 
    },
    contact: {
        type: Number 
    }

})

module.exports = mongoose.model("Employee" , empSchema);