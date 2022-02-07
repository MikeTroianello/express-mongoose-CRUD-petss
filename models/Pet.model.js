const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema =  new Schema({
    name: {
        type: String,
        required: true
    },

    age: Number,


    animalType: {
        type: String,
        enum: ['cat', 'dog']
    },

    isFixed: {
        type: Boolean,
        default: false
    }

})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet