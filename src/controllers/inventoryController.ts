import { Request, Response } from "express";
import { InventoryService } from "../services/inventoryService";
import { getPaginationOptions } from "../utils/pagination";
import InventoryItem from "../models/InventoryItem.models";
import { sendResponse } from "../utils/sendResponse";

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
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) {
      return sendResponse(res, 404, "Inventory item not found", null, [
        "Inventory item not found"
      ]);
    }
    sendResponse(res, 200, "Inventory item retrieved successfully", item);
  } catch (error) {
    sendResponse(res, 500, "Failed to retrieve inventory item", null, [
      "Internal server error"
    ]);
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) {
      return sendResponse(res, 404, "Inventory item not found", null, [
        "Inventory item not found"
      ]);
    }

    const updatedItem = await item.update(req.body);
    sendResponse(res, 200, "Inventory item updated successfully", updatedItem);
  } catch (error) {
    sendResponse(res, 500, "Failed to update inventory item", null, [
      "Internal server error"
    ]);
  }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) {
      return sendResponse(res, 404, "Inventory item not found", null, [
        "Inventory item not found"
      ]);
    }

    await item.destroy();
    sendResponse(res, 200, "Inventory item deleted successfully");
  } catch (error) {
    sendResponse(res, 500, "Failed to delete inventory item", null, [
      "Internal server error"
    ]);
  }
};
