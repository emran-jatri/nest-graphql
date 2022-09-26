import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NotFoundException } from '@nestjs/common';
import { Post } from './schemas/post.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return await this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
	async findOne(@Args('id') id: string) {
		const post = await this.postService.findOne(id)

		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return post;
  }

  @Mutation(() => Post)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
		
		const post = await this.postService.update(updatePostInput)

		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return post;

  }

  @Mutation(() => Post)
	async removePost(@Args('id') id: string) {
		const post = await this.postService.remove(id)

		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return post;
  }
}
