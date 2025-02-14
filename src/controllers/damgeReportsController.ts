import { Request, Response } from "express";
import { DamageReportsService } from "../services/damageReportsService";
import { getPaginationOptions } from "../utils/pagination";
import { sendResponse } from "../utils/sendResponse";
import DamageReport from "../models/damageReport";

const damageReportsService = new DamageReportsService();

export const createDamageReport = async (req: Request, res: Response) => {
  try {
    const newReport = await damageReportsService.createDamageReport(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error creating damage report" });
  }
};

export const getAllDamageReports = async (req: Request, res: Response) => {
  try {
    const { limit, offset, order } = getPaginationOptions(req);
    const { data, total } = await damageReportsService.getAllDamageReports(
      limit,
      offset,
      order
    );
    res.status(200).json({ data, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching damage reports" });
  }
};

export const getDamageReportById = async (req: Request, res: Response) => {
  try {
    const report = await DamageReport.findByPk(req.params.id);
    if (!report) {
      return sendResponse(res, 404, "Damage report not found", null, [
        "Damage report not found"
      ]);
    }
    sendResponse(res, 200, "Damage report retrieved successfully", report);
  } catch (error) {
    sendResponse(res, 500, "Failed to retrieve damage report", null, [
      "Internal server error"
    ]);
  }
};

export const updateDamageReport = async (req: Request, res: Response) => {
  try {
    const report = await DamageReport.findByPk(req.params.id);
    if (!report) {
      return sendResponse(res, 404, "Damage report not found", null, [
        "Damage report not found"
      ]);
    }

    const updatedReport = await report.update(req.body);
    sendResponse(res, 200, "Damage report updated successfully", updatedReport);
  } catch (error) {
    sendResponse(res, 500, "Failed to update damage report", null, [
      "Internal server error"
    ]);
  }
};
