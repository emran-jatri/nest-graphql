import { ObjectType } from "@nestjs/graphql";
import { paginate } from "src/common/entities";
import { Post } from "./post.entity";

@ObjectType()
export class PostPaginate extends paginate(Post){}