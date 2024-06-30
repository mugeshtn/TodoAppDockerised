import express from 'express';
import { todoDelete, todoGet, todoPost, todoUpdate } from './Controller.js';


const route = express.Router()

route.get('/', todoGet);
route.post('/', todoPost);
route.put('/:id', todoUpdate);
route.delete('/:id', todoDelete)

export default route;
