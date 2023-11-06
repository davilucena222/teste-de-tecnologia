import { Request, Response } from "express";
import mysql from "mysql";
import { database } from "../lib/database_config";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export const findUser = (req: Request, response: Response) => {
  const userId = req.params.id; 
  const query = "SELECT * FROM usuarios WHERE id = ?"; 

  database.query(query, [userId], (error: mysql.MysqlError | null, data: UserData[]) => {
    if (error) {
      return response.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    return response.status(200).json(data[0]); 
  });
};
