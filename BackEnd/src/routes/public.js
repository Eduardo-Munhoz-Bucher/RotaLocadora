import express from 'express'
import usuarioController from '../app/controllers/usuarioController.js'

const router = express.Router()

router.use(express.json())

// Cadastro
router.post('/usuarios', usuarioController.storyUsuario)

export default router