import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'Example field (placeholder)' })
	id: string;

	@Field()
	content: string;

	@Field()
	user: User
}
