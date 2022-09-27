import { NotFoundException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import successResponse from 'src/common/successResponse';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post, PostPaginate } from './entities';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
		const post = await this.postService.create(createPostInput);
		return post
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
		const posts = await this.postService.findAll();
		return posts
	}
	
  @Query(() => PostPaginate, { name: 'postPaginate' })
	async paginate(@Context() cnt) {
		// console.log('paginateAll', cnt.body);
		const posts = await this.postService.paginate();
		return posts
  }

  @Query(() => Post, { name: 'post' })
	async findOne(@Args('id') id: string) {
		const post = await this.postService.findOne(id)
		// console.log("🚀 ~ file: post.resolver.ts ~ line 34 ~ PostResolver ~ findOne ~ post", post)
		
		if (!post) {
			throw new NotFoundException("Post not found!")
		}
		
		return { statusCode: 201,...post.toObject(), message: "1 Post Fount"};
		// return post;
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
