const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemsSchema = new Schema({
    name: String,
    done: Boolean,
    key: String
})

const itemStorageSchema = new Schema({
    id: Number,
    items: [itemsSchema]
})


const itemStorage = mongoose.model('itemStorage', itemStorageSchema)


module.exports = itemStorage