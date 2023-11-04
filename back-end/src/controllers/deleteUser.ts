import { Request, Response } from "express";
import { database } from "../lib/database_config";

export const deleteUser = (request: Request, response: Response) => {
  if (request.body) {
    const query = "DELETE FROM usuarios WHERE `id` = ?";

    database.query(query, [request.params.id], (error) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }

      return response.status(200).json("Usuário deletado com sucesso!");
    });
  }
}