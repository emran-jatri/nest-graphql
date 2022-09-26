import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
	@Field(() => ID)
	id: string;

	@Field()
	content: string;
}
