import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
	content: string;

	@Field(() => ID)
	user: string
}
