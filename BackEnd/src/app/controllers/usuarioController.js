import usuarioModel from "../models/usuarioModel.js";

class usuarioController {
  async indexUsuarios(req, res) {
    const row = await usuarioModel.getUsuarios();
    res.status(200).json(row)
  }

  async storyUsuario(req, res) {
    const usuario = req.body;
    const novoUsuario  = await usuarioModel.createUsuario(usuario);

    delete novoUsuario.senha;

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: novoUsuario ,
    });
  }
}

export default new usuarioController();
