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
    list: () => User.findAll({ order: [['created_at', 'DESC']] }),
    get:  (id) => User.findByPk(id),
    create: (data) => User.create(data),
    update: (id, data) => User.update(data, { where: { id } }),
    delete: (id) => User.destroy({ where: { id } }),
    findByEmail: (email) => User.findOne({ where: { email }, attributes: ['id', 'email', 'role', 'password']})
};
// Ruta POST /auth
Router.post('/auth', async (err, req, res, next) => {
  try {
    const { name, password, email } = req.body
    console.log(req.body );
    console.log('asd');
    userRepository.create({ name, password , email });
    const users = userRepository.list();
    console.log(users)
    res.json({ message: 'Auth endpoint OK act' });
  } catch (err) {
    next(err);
  }
});


export default Router;
