import { Router } from "express";
import { getCategories } from "../controllers/category.controller";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

export default categoriesRouter;
