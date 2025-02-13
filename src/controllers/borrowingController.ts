import { Request, Response } from "express";
import { BorrowingService } from "../services/borrowingService";
import { getPaginationOptions } from "../utils/pagination";
import Borrowing from "../models/Borrowing.models";
import { sendResponse } from "../utils/sendResponse";

const borrowingService = new BorrowingService();

export const createBorrowing = async (req: Request, res: Response) => {
  try {
    const newBorrowing = await borrowingService.createBorrowing(req.body);
    res.status(201).json(newBorrowing);
  } catch (error) {
    res.status(500).json({ message: "Error creating borrowing record" });
  }
};

export const getAllBorrowings = async (req: Request, res: Response) => {
  try {
    const { limit, offset, order } = getPaginationOptions(req);
    const { data, total } = await borrowingService.getAllBorrowings(
      limit,
      offset,
      order
    );
    res.status(200).json({ data, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowing records" });
  }
};

export const getBorrowingById = async (req: Request, res: Response) => {
  try {
    const borrowing = await Borrowing.findByPk(req.params.id);
    if (!borrowing) {
      // Use sendResponse and return to stop execution
      return sendResponse(res, 404, "Borrowing record not found", null, [
        "Borrowing record not found"
      ]);
    }
    sendResponse(res, 200, "Person updated successfully", borrowing);
  } catch (error) {
    // Use sendResponse without returning
    sendResponse(res, 500, "Error fetching borrowing record", null, [
      "Internal server error"
    ]);
  }
};

export const returnBorrowedItem = async (req: Request, res: Response) => {
  try {
    const returnedBorrowing = await Borrowing.findByPk(req.params.id);
    if (!returnedBorrowing) {
      return sendResponse(res, 404, "Borrowing record not found", null, [
        "Borrowing record not found"
      ]);
    }
    sendResponse(res, 200, "Person updated successfully", returnedBorrowing);
  } catch (error) {
    sendResponse(res, 500, "Error returning borrowed item", null, [
      "Internal server error"
    ]);
  }
};

export const getOverdueBorrowings = async (req: Request, res: Response) => {
  try {
    const overdueBorrowings = await borrowingService.getOverdueBorrowings();
    res.status(200).json(overdueBorrowings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue borrowings" });
  }
};
