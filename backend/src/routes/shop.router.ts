import { Router } from "express";
import { getShops } from "../controllers/shop.controller";

const shopsRouter = Router();

shopsRouter.get("/", getShops);

export default shopsRouter;
