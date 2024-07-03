import express from 'express';
import { todoDelete, todoGet, todoAdd, todoUpdate } from './Controller.js';


const route = express.Router()

route.get('/', todoGet);
route.post('/', todoAdd);
route.put('/:id', todoUpdate);
route.delete('/:id', todoDelete)

export default route;
