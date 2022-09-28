import { ObjectType } from "@nestjs/graphql";
import { AnyType } from "src/common/entities";
import { Post } from "./post.entity";

@ObjectType()
export class PostQuery extends AnyType(Post){}