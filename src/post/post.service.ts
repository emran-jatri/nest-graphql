import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {

	constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

	async create(createPostInput: CreatePostInput) {
		const post = await this.postModel.create(createPostInput);
    return post.populate("user");
  }

	async findAll() {
		const posts = await this.postModel.find().populate("user").exec();
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
