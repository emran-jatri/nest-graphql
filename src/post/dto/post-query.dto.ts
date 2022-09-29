import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class PostQueryDTO{
	@Field({ nullable: true, defaultValue: 1 })
	page: number;

	@Field({ nullable: true, defaultValue: 10 })
	limit: number;
}