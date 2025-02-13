import { Request, Response } from "express";
import { SystemLogsService } from "../services/systemLogsService";
import { getPaginationOptions } from "../utils/pagination";
import SystemLog from "../models/SystemLog.models";
import { sendResponse } from "../utils/sendResponse";

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
    const log = await SystemLog.findByPk(req.params.id);
    if (!log) {
      return sendResponse(res, 404, "System log not found", null, [
        "System log not found"
      ]);
    }
    sendResponse(res, 200, "Log found successfully", log);
  } catch (error) {
    sendResponse(res, 500, "Error fetching system log", null, [
      "Internal server error"
    ]);
  }
};
