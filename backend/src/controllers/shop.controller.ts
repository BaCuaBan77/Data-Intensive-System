import { Request, Response, NextFunction } from "express";
import { getAllShops } from "../services/shop.service";

export const getShops = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const shops = await getAllShops();

    return response.json(shops);
  } catch (err) {
    next({ message: "Failed to load shops" });
  }
};
