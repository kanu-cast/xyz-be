import InventoryItem from "../models/InventoryItem.models";

export class InventoryService {
  async createInventoryItem(itemData: any) {
    return await InventoryItem.create(itemData);
  }

  async getAllInventoryItems(limit: number, offset: number, order: any) {
    const data = await InventoryItem.findAll({ limit, offset, order });
    const total = await InventoryItem.count();
    return { data, total };
  }

  async getInventoryItemById(itemId: string) {
    return await InventoryItem.findByPk(itemId);
  }

  async updateInventoryItem(itemId: string, itemData: any) {
    const item = await InventoryItem.findByPk(itemId);
    if (!item) {
      return null;
    }
    return await item.update(itemData);
  }

  async deleteInventoryItem(itemId: string) {
    const item = await InventoryItem.findByPk(itemId);
    if (!item) {
      return null;
    }
    await item.destroy();
    return item;
  }
}
