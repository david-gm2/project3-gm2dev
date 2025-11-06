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

// Ruta POST /auth
Router.post('/auth', async (req, res, next) => {
  try {
    console.log('asd');
    res.send('Auth endpoint');
  } catch (err) {
    next(err);
  }
});

export default Router;
