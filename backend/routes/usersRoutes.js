import express from 'express';

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
  const { mode } = req.query; // lee ?mode=signin o ?mode=signup
  const data = req.body;

  if (mode === 'signin') {
    // lógica de inicio de sesión
    return res.json({ action: 'signin', data });
  }

  if (mode === 'signup') {
    // lógica de registro
    return res.json({ action: 'signup', data });
  }

  return res.status(400).json({ error: 'Modo inválido' });
});



export default Router;
