import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
@ObjectType()
export class User {
	@Field(() => String)
	_id: mongoose.Schema.Types.ObjectId
		
  @Prop()
	@Field()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);