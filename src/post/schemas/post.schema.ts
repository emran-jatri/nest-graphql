import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Post {
	@Prop()
	@Field()
	content: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
	@Field(() => ID)
	user: User;

}

export const PostSchema = SchemaFactory.createForClass(Post);