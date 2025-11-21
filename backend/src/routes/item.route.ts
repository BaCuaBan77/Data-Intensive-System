import { Router } from "express";
import { getItems } from "../controllers/item.controller";

const itemsRouter = Router();

itemsRouter.get("/", getItems);

export default itemsRouter;