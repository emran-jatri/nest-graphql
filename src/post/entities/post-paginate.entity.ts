import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "./post.entity";

@ObjectType()
export class PostPaginate{
	@Field()
	message: string;
		
	@Field(() => [Post])
	docs: Post

	@Field()
	totalDocs: number

	@Field()
	limit: number
	
	@Field()
	totalPages: number
	
	@Field()
	page: number
	
	@Field()
	pagingCounter: number
	
	@Field()
	hasPrevPage: boolean
	
	@Field()
	hasNextPage: boolean
	
	@Field({ nullable: true })
	prevPage: number
	
	@Field()
  nextPage: boolean
}