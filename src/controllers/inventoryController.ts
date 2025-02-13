import { Request, Response } from "express";
import { InventoryService } from "../services/inventoryService";
import { getPaginationOptions } from "../utils/pagination";

const inventoryService = new InventoryService();

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const newItem = await inventoryService.createInventoryItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating inventory item" });
  }
};

export const getAllInventoryItems = async (req: Request, res: Response) => {
  try {
    const { limit, offset, order } = getPaginationOptions(req);
    const { data, total } = await inventoryService.getAllInventoryItems(
      limit,
      offset,
      order
    );
    res.status(200).json({ data, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory items" });
  }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  try {
    const item = await inventoryService.getInventoryItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory item" });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await inventoryService.updateInventoryItem(
      req.params.id,
      req.body
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory item" });
  }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await inventoryService.deleteInventoryItem(
      req.params.id
    );
    if (!deletedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item" });
  }
};
