import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    }
})


const todoModel = mongoose.model('todo', todoSchema)

export default todoModel;