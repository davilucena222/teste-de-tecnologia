import { Request, Response } from "express";
import { database } from "../lib/database_config";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}[]

export const updateUser = (request: Request, response: Response) => {
  console.log("Resultado da requisição: " + JSON.stringify(request.body));
  if (request.body) {
    const query = "UPDATE usuarios SET `name` = ?, `email` = ?, `phone` = ?, `updated_at` = ? WHERE `id` = ?";
    const body = request.body as UserData;

    const data = [
      body.name,
      body.email,
      body.phone,
      body.updated_at
    ];

    database.query(query, [...data, request.params.id], (error) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }

      return response.status(200).json("Usuário atualizado com sucesso!");
    })
  } else {
    response.status(400).json({ error: 'O corpo da requisição está vazio!' });
  }
}