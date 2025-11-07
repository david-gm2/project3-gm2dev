import express from 'express';
import { createError } from '../utils/errorUtils.js';
import { ERROR_TYPES } from '../constants/errorTypes.js';
import User from '../models/userModel.js';

const Router = express.Router();

// Repositorio
const userRepository = {
  list: () => User.findAll({ order: [['created_at', 'DESC']] }),
  get:  (id) => User.findByPk(id),
  create: (data) => User.create(data),
  update: (id, data) => User.update(data, { where: { id } }),
  delete: (id) => User.destroy({ where: { id } }),
  findByEmail: (email) =>
    User.findOne({
      where: { email },
      attributes: ['id', 'email', 'role', 'password'],
    }),
};

// GET /auth
Router.get('/auth', async (req, res, next) => {
  try {
    console.log('ola');
    res.json('Hola mundo');
  } catch (err) {
    next(err);
  }
});

// POST /auth?mode=signin|signup
Router.post('/auth', async (req, res, next) => {
  try {
    const { mode } = req.query;       // ?mode=signin / ?mode=signup
    const { nombre, email, password } = req.body; // OJO: nombre, no name

    if (!mode) {
      throw createError(400, ERROR_TYPES.BAD_REQUEST, 'Falta mode en query');
    }

    if (!email || !password) {
      throw createError(400, ERROR_TYPES.BAD_REQUEST, 'Email y password son requeridos');
    }

    const emailExist = await userRepository.findByEmail(email);

    // LOGIN
    if (mode === 'signin') {
      if (!emailExist) {
        throw createError(400, ERROR_TYPES.INVALID, 'Usuario no registrado');
      }

      // Por ahora comparás plano. Después vas a meter bcrypt.
      if (emailExist.password !== password) {
        throw createError(400, ERROR_TYPES.INVALID, 'Credenciales inválidas');
      }

      // TODO: generar JWT / session
      return res.json({
        success: true,
        message: 'Inicio de sesión correcto',
        user: {
          id: emailExist.id,
          email: emailExist.email,
          role: emailExist.role,
        },
      });
    }

    // REGISTRO
    if (mode === 'signup') {
      if (emailExist) {
        throw createError(400, ERROR_TYPES.INVALID, 'Email existente');
      }

      if (!nombre) {
        throw createError(400, ERROR_TYPES.BAD_REQUEST, 'Nombre es requerido');
      }

      const newUser = await userRepository.create({
        nombre,   // campo que espera tu modelo
        email,
        password, // luego lo vas a hashear
      });

      return res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }

    // Si mode no es signin ni signup
    throw createError(400, ERROR_TYPES.BAD_REQUEST, 'Modo inválido');

  } catch (err) {
    next(err);
  }
});

export default Router;
