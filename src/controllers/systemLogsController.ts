import { Request, Response } from "express";
import { SystemLogsService } from "../services/systemLogsService";
import { getPaginationOptions } from "../utils/pagination";

const systemLogsService = new SystemLogsService();

export const getAllSystemLogs = async (req: Request, res: Response) => {
  try {
    const { limit, offset, order } = getPaginationOptions(req);
    const { data, total } = await systemLogsService.getAllSystemLogs(
      limit,
      offset,
      order
    );
    res.status(200).json({ data, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching system logs" });
  }
};

export const getSystemLogById = async (req: Request, res: Response) => {
  try {
    const log = await systemLogsService.getSystemLogById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "System log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Error fetching system log" });
  }
};
