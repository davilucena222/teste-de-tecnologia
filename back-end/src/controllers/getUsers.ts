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
}[]

export const getUsersData = (_: Request, response: Response) => {
  const query = "SELECT * FROM usuarios";

  database.query(query, (error: mysql.MysqlError | null, data: UserData[]) => {

    if (error) {
      return response.status(500).json({ error: error.message });
    }

    return response.status(200).json(data);
  });
};
