import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {

	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserInput: CreateUserInput) {
		const user = await this.userModel.create(createUserInput)
    return user;
  }

	async findAll() {
		const users = await this.userModel.find().exec();
		return users
  }

  async findOne(id: string) {
		const user = await this.userModel.findOne({ _id: id }).exec();
		return user
  }

	async update(updateUserInput: UpdateUserInput) {
		const user = await this.userModel.findOneAndUpdate({ _id: updateUserInput.id }, {name: updateUserInput.name}, {new: true, runValidators: true})
    return user;
  }

	async remove(id: string) {
		const user = await this.userModel.findOneAndDelete({ _id: id })
		return user;
  }
}
