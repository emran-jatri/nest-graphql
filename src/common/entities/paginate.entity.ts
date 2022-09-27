import { Type } from '@nestjs/common';
import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseClass } from './response.entity';


export function paginate<T>(ItemType: Type<T>): any {
		@ObjectType({ isAbstract: true })
		abstract class PaginateClass extends ResponseClass{
			@Field(() => [ItemType])
			docs: T[]

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
	return PaginateClass
}

