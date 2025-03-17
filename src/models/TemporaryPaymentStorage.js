import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
    details: Object
})

export default mongoose.model('testing', testSchema)