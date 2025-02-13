import DamageReport from "../models/DamageReport.models";

export class DamageReportsService {
  async createDamageReport(reportData: any) {
    return await DamageReport.create(reportData);
  }

  async getAllDamageReports(limit: number, offset: number, order: any) {
    const data = await DamageReport.findAll({ limit, offset, order });
    const total = await DamageReport.count();
    return { data, total };
  }

  async getDamageReportById(reportId: string) {
    return await DamageReport.findByPk(reportId);
  }

  async updateDamageReport(reportId: string, reportData: any) {
    const report = await DamageReport.findByPk(reportId);
    if (!report) {
      return null;
    }
    return await report.update(reportData);
  }
}
