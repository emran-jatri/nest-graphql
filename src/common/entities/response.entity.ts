import { Field, ObjectType } from "@nestjs/graphql";
import { STATUS_CODE_200, SUCCESS_MESSAGE } from "../constants";


@ObjectType({isAbstract: true})
export abstract class ResponseClass{
	@Field({ nullable: true, defaultValue: SUCCESS_MESSAGE})
	message: string

	@Field({ nullable: true, defaultValue: STATUS_CODE_200 })
	statusCode: number;

}