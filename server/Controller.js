import todoModel from './todoSchema.js';


const handleDBErrors = (err) => {
    if(err.code === 11000){
        return "Task title already added!!! Consider editing!"
    }
    return "Error occured in adding todo"
}

export const todoGet = async (req, res) => {
    try {
        const todos = await todoModel.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
}
}

export const todoAdd = async (req, res) => {
    try {

        const { title, description } = req.body
        const newTodo = new todoModel({ title, description })
        await newTodo.save()
        res.status(200).json(newTodo)
    } catch (error) {
        const err = handleDBErrors(error)
        res.status(500).json({ message: err })
    }
}


export const todoUpdate = async (req, res) => {
    try {
        const { title, description } = req.body
        const id = req.params.id

        const updatedTodo = await todoModel.findByIdAndUpdate(id, { title, description })

        if (!updatedTodo) {
            return res.status(404).json({ "Error": "updating todo item not found" })
        }

        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const todoDelete = async (req, res) => {
    try {
        const id = req.params.id
        await todoModel.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}