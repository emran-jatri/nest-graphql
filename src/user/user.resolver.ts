import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import successResponse from 'src/common/successResponse';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
		const users = await this.userService.findAll();
		return users
  }

  @Query(() => User, { name: 'user' })
	async findOne(@Args('id') id: string) {
		const user = await this.userService.findOne(id)

		if (!user) {
			throw new NotFoundException("User not found!")
		}
		
		return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		
		const user = await this.userService.update(updateUserInput)

		if (!user) {
			throw new NotFoundException("User not found!")
		}
		
		return user;

  }

  @Mutation(() => User)
	async removeUser(@Args('id') id: string) {
		const user = await this.userService.remove(id)

		if (!user) {
			throw new NotFoundException("User not found!")
		}
		
		return user;
  }
}
