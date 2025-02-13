import SystemLog from "../models/SystemLog.models";

export class SystemLogsService {
  async getAllSystemLogs(limit: number, offset: number, order: any) {
    const data = await SystemLog.findAll({ limit, offset, order });
    const total = await SystemLog.count();
    return { data, total };
  }

  async getSystemLogById(logId: string) {
    return await SystemLog.findByPk(logId);
  }
}
