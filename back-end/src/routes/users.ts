import express from "express";
import { getUsersData } from "../controllers/getUsers";
import { deleteUser } from "../controllers/deleteUser";
import { updateUser } from "../controllers/updateUser";
import { addUser } from "../controllers/addUser";
import { findUser } from "../controllers/findUser";

const router = express.Router();

router.get("/", getUsersData);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/findUser/:id", findUser);

export default router;