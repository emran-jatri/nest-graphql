import { Type } from '@nestjs/common';
import { Field, ObjectType } from "@nestjs/graphql";
import { STATUS_CODE_200, SUCCESS_MESSAGE } from '../constants';


export function AnyType<T>(ItemType: Type<T>): any {
		@ObjectType({ isAbstract: true })
		abstract class AnyClass{
			@Field({ nullable: true, defaultValue: SUCCESS_MESSAGE})
			message: string

			@Field({ nullable: true, defaultValue: STATUS_CODE_200 })
			statusCode: number;

			@Field(() => ItemType)
			object: T

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
	return AnyClass
}

