import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { successResponse } from 'src/common';
import { PostQueryDTO } from './dto';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post, PostQuery } from './entities';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostQuery)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
		const post = await this.postService.create(createPostInput);
		return successResponse({ statusCode: 201, data: post, message: "1 Post Fount" });
  }

  @Query(() => PostQuery, { name: 'posts' })
  async findAll() {
		const posts = await this.postService.findAll();
		return successResponse({ data: posts});
		// return posts
		// return successResponse({data: posts})
	}
	
  @Query(() => PostQuery, { name: 'postPaginate' })
	async paginate(@Args("queryInput") queryInput: PostQueryDTO) {
		// console.log('paginateAll', cnt.body);
		const posts = await this.postService.paginate(queryInput);

		// throw new NotFoundException('paginate failed');

		return successResponse({ statusCode: 201, data: posts, message: "Data fetched successfully." });
  }

  @Query(() => PostQuery, { name: 'post' })
	async findOne(@Args('id') id: string) {
		const post = await this.postService.findOne(id)
		
		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return successResponse({ statusCode: 201, data: post, message: "1 Post Fount"});
		// return post;
  }

  @Mutation(() => PostQuery)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
		
		const post = await this.postService.update(updatePostInput)

		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return post;

  }

  @Mutation(() => PostQuery)
	async removePost(@Args('id') id: string) {
		const post = await this.postService.remove(id)

		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return post;
  }
}
