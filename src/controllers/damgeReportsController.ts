import { Request, Response } from "express";
import { DamageReportsService } from "../services/damageReportsService";
import { getPaginationOptions } from "../utils/pagination";

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
    const report = await damageReportsService.getDamageReportById(
      req.params.id
    );
    if (!report) {
      return res.status(404).json({ message: "Damage report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching damage report" });
  }
};

export const updateDamageReport = async (req: Request, res: Response) => {
  try {
    const updatedReport = await damageReportsService.updateDamageReport(
      req.params.id,
      req.body
    );
    if (!updatedReport) {
      return res.status(404).json({ message: "Damage report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: "Error updating damage report" });
  }
};
