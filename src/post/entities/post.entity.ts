import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ResponseClass } from 'src/common/entities';
import { User } from 'src/user/entities/user.entity';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Post extends ResponseClass{
	@Field(() => String)
	_id: mongoose.Schema.Types.ObjectId

	@Prop()
	@Field()
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
	@Field()
	user: User;

}

export const PostSchema = SchemaFactory.createForClass(Post);