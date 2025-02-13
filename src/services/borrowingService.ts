import Borrowing from "../models/Borrowing.models";
import { Op } from "sequelize";
export class BorrowingService {
  async createBorrowing(borrowingData: any) {
    return await Borrowing.create(borrowingData);
  }

  async getAllBorrowings(limit: number, offset: number, order: any) {
    const data = await Borrowing.findAll({ limit, offset, order });
    const total = await Borrowing.count();
    return { data, total };
  }

  async getBorrowingById(borrowingId: string) {
    return await Borrowing.findByPk(borrowingId);
  }

  async returnBorrowedItem(borrowingId: string, returnData: any) {
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing) {
      return null;
    }
    return await borrowing.update({ ...returnData, returned_at: new Date() });
  }

  async getOverdueBorrowings() {
    return await Borrowing.findAll({
      //@ts-ignore
      where: {
        returned_at: null,
        expected_return_date: { [Op.lt]: new Date() } // Op.lt = less than
      }
    });
  }
}
