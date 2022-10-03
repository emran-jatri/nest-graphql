import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PaginateModel } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {

	constructor(
		@InjectModel(Post.name) private postModel: PaginateModel<PostDocument>,
		@InjectConnection() private readonly connection: mongoose.Connection
	) { }

	async create(createPostInput: CreatePostInput) {
		const session = await this.connection.startSession()
		// let result = null
		try {
			session.startTransaction()
			// const post = await this.postModel.create([createPostInput], { session });
			// const post = await this.postModel.create(createPostInput);
			const post = new this.postModel(createPostInput)
			const newPost = await post.save({ session })
			// console.log("🚀 ~ file: post.service.ts ~ line 18 ~ PostService ~ create ~ post", post)
			// throw new Error(`Error creating post: ${createPostInput.content}`);
			await session.commitTransaction();
			// session.endSession()
			// result = post
			return newPost
		} catch (error) {
			console.log('error');
			await session.abortTransaction();
			// session.endSession()
			throw error;
		} finally {
			session.endSession()
		}
			
  }

	async findAll() {
		const posts = await this.postModel.find().exec();
		return posts
	}
	
	async paginate(queryInput) {
		const posts = await this.postModel.paginate({},{ page: queryInput.page, limit: queryInput.limit});
		return posts
  }

  async findOne(id: string) {
		const post = await this.postModel.findOne({ _id: id }).exec();
		return post
  }

	async update(updatePostInput: UpdatePostInput) {
		const post = await this.postModel.findOneAndUpdate({ _id: updatePostInput.id }, {name: updatePostInput.content}, {new: true, runValidators: true})
    return post;
  }

	async remove(id: string) {
		const post = await this.postModel.findOneAndDelete({ _id: id })
		return post;
  }
}
