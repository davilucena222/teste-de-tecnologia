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

export const addUser = (request: Request, response: Response) => {
  if (request.body) {
    const body = request.body as UserData;
    const query = "INSERT INTO usuarios(`name`, `email`, `phone`, `created_at`) VALUES(?)";

    if (typeof body.name !== 'string' || !isNaN(Number(body.name))) {
      return response.status(400).json({ error: 'O campo "name" deve ser fornecido um texto. Por favor, tente novamente!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return response.status(400).json({ error: 'O campo "email" não é um endereço de e-mail válido. Por favor, tente novamente!' });
    }

    if (isNaN(Number(body.phone))) {
      return response.status(400).json({ error: 'O campo "phone" deve ser um número válido. Por favor, tente novamente!' });
    }

    const data = [
      body.name,
      body.email,
      body.phone,
      body.created_at
    ];

    database.query(query, [data], (error) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }

      return response.status(200).json("Usuário criado com sucesso!");
    });
  } else {
    response.status(400).json({ error: "O corpo da requisição está vazio!" });
  }
}