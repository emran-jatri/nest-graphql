import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {

	id = 1
	users = []

	create(createUserInput: CreateUserInput) {
		console.log("🚀 ~ file: user.service.ts ~ line 12 ~ UserService ~ create ~ create")
		const user = {...createUserInput, id: this.id++}
    console.log("🚀 ~ file: user.service.ts ~ line 15 ~ UserService ~ create ~ user", user)
		this.users.push(user);
    return user;
  }

	findAll() {
		console.log("🚀 ~ file: user.service.ts ~ line 18 ~ UserService ~ findAll ~ findAll")
    return this.users;
  }

  findOne(id: number) {
    console.log("🚀 ~ file: user.service.ts ~ line 23 ~ UserService ~ findOne ~ findOne")
    return this.users.find(item => item.id === id);
  }

	update(updateUserInput: UpdateUserInput) {
		console.log("🚀 ~ file: user.service.ts ~ line 28 ~ UserService ~ update ~ update")
		let user = this.findOne(updateUserInput.id)
		user.exampleField = updateUserInput.exampleField
    return user;
  }

	remove(id: number) {
		console.log("🚀 ~ file: user.service.ts ~ line 36 ~ UserService ~ remove ~ remove")
		this.users = this.users.filter(item => item.id !== id);
		return id + " is deleted";
  }
}
