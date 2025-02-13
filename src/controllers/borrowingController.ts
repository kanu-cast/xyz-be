import { Request, Response } from "express";
import { BorrowingService } from "../services/borrowingService";
import { getPaginationOptions } from "../utils/pagination";

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
    const borrowing = await borrowingService.getBorrowingById(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }
    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowing record" });
  }
};

export const returnBorrowedItem = async (req: Request, res: Response) => {
  try {
    const returnedBorrowing = await borrowingService.returnBorrowedItem(
      req.params.id,
      req.body
    );
    if (!returnedBorrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }
    res.status(200).json(returnedBorrowing);
  } catch (error) {
    res.status(500).json({ message: "Error returning borrowed item" });
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
