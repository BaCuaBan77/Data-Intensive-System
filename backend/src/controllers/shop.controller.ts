import { Request, Response } from "express";
import { getAllShops } from "../services/shop.service";

export const getShops = async (_request: Request, response: Response) => {
  try {
    const shops = await getAllShops();

    return response.json(shops);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load shops" });
  }
};
