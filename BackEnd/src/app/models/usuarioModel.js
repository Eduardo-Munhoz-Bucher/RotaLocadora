import { consulta } from "../database/conexao.js";

class usuarioModel {
  async createUsuario(usuario) {
    const sqlInsert = "INSERT INTO usuarios SET ?";
    const sqlSelect = "SELECT * FROM usuarios WHERE id =?"
    try {
      const resultado = await consulta(
        sqlInsert,
        usuario,
        "Usuário cadastrado com sucesso!"
      )
      console.log("Usuário adicionado com sucesso!");

      const insertId = resultado.insertId;
      const rows = await consulta(
        sqlSelect,
        [insertId],
        "Não foi possivel buscar o usuário cadastrado"
      )

      return rows[0]

    } catch (error) {
      console.log("Erro ao adicionar usuário: ", error);
    }
  }

  getUsuarios() {
    const sql = "SELECT * FROM usuarios";
    return consulta(sql, "Não foi possivel encontrar os usuarios!");
  }
}

export default new usuarioModel();