import { Request, Response, request } from "express";
import { database } from "../lib/database_config";

export const deleteUser = (request: Request, response: Response) => {
  if (request.params.id) {
    const query = "UPDATE usuarios SET `deleted_at` = NOW() WHERE `id` = ?";

    database.query(query, [request.params.id], (error) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }

      return response.status(200).json("Usuário excluído com sucesso!");
    });
  } else {
    return response.status(400).json("ID do usuário não fornecido na solicitação!");
  }
}