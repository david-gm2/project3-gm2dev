import express from 'express';
import { createError } from '../utils/errorUtils.js'
import { ERROR_TYPES } from '../constants/errorTypes.js';

const Router = express.Router();

// Ruta GET /
Router.get('/auth', async (req, res, next) => {
  try {
    console.log('ola');
    res.json('Hola mundo');
  } catch (err) {
    next(err);
  }
});


import User from '../models/userModel.js'

const userRepository = {
    list: () => User.findAll({ order: [['created_at', 'DESC']] }),
    get:  (id) => User.findByPk(id),
    create: (data) => User.create(data),
    update: (id, data) => User.update(data, { where: { id } }),
    delete: (id) => User.destroy({ where: { id } }),
    findByEmail: (email) => User.findOne({ where: { email }, attributes: ['id', 'email', 'role', 'password']})
};
// Ruta POST /auth

Router.post('/auth', (req, res) => {
  try { 
    const { mode } = req.query; // lee ?mode=signin o ?mode=signup
    const { name, email , password} = req.body;
  

    const emailExist = userRepository.findByEmail(email)
    if (mode === 'signin') {
      if (!emailExist) throw createError(400, ERROR_TYPES.INVALID, 'Usuario no registrado')
      
    if ( emailExist.password !== password )  throw createError(400, ERROR_TYPES.INVALID, 'Usuario no registrado')
    }
  
    if (mode === 'signup') {
      if (emailExist) throw createError(400, ERROR_TYPES.INVALID, 'Email existnente')
  
      userRepository.create(name, email , password)
  
    }
  
    return res.status(400).json({ error: 'Modo inválido' });
    
  } catch {
    next();
  }
});



export default Router;
