import User from "../models/User.models";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashedPassword });
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  async getUserById(userId: string) {
    return await User.findByPk(userId);
  }

  async updateUser(userId: string, userData: any) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(userData);
  }
}
