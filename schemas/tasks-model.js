const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: String,
    description: String,
    responsible: String,
    finished: Boolean,
    id: String
})

const tasksStorageSchema = new Schema({
    id: Number,
    tasks: [tasksSchema]
})

const tasksStorage = mongoose.model('tasksStorage', tasksStorageSchema)

module.exports = tasksStorage