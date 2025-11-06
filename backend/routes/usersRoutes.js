import express from 'express';

const Router = express.Router();

// Ruta GET /
Router.get('/', async (req, res, next) => {
  try {
    console.log('ola');
    res.json('Hola mundo');
  } catch (err) {
    next(err);
  }
});


import User from '../models/userModel.js'

const userRepository = {
    list: () => Usuario.findAll({ order: [['created_at', 'DESC']] }),
    get:  (id) => Usuario.findByPk(id),
    create: (data) => Usuario.create(data),
    update: (id, data) => Usuario.update(data, { where: { id } }),
    delete: (id) => Usuario.destroy({ where: { id } }),
    findByEmail: (email) => Usuario.findOne({ where: { email }, attributes: ['id', 'email', 'role', 'password']})
};
// Ruta POST /auth
Router.post('/auth', async (req, res, next) => {
  try {
    console.log('asd');
    userRepository.create(req.body);
    userRepository.list();
    res.json({ message: 'Auth endpoint OK' });
  } catch (err) {
    next(err);
  }
});


export default Router;
