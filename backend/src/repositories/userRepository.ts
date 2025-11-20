import { UserModel } from '../models/User';
import { IUser, CreateUserDTO, UpdateUserDTO } from '../types/User';

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return await UserModel.find().sort({ _id: 1 }) as any;
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id) as any;
  }

  async create(userData: CreateUserDTO): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save() as any;
  }

  async update(id: string, userData: UpdateUserDTO): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true }) as any;
  }

  async delete(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id) as any;
  }

  async countDocuments(): Promise<number> {
    return await UserModel.countDocuments();
  }
}
