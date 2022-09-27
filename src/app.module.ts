import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';


@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nest-graphql', {
      connectionFactory: (connection) => {
				connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(mongoosePaginate);
        return connection;
      }
    }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			formatResponse(response, requestContext) {
				let operationName = ""
				if (requestContext.request.query.startsWith("mutation")) {
					operationName = requestContext.request.query.split(/[{}()]/gmi)[1].trim()
				} else {
					operationName = requestContext.request.query.split("{")[1].trim()
				}
				
				let message = "SUCCESS"
				let statusCode = 200

				if (response?.errors) {
					// @ts-ignore
					message = response.errors[0]?.extensions?.response?.message || response.errors[0]?.message || "ERROR"
					// @ts-ignore
					statusCode = response.errors[0]?.extensions?.response?.statusCode || 500
					response.errors = undefined
				}

				if (statusCode === 200 && response.data[operationName]?.message) {
					message = response.data[operationName]?.message
					delete response.data[operationName]?.message
				}

				response.data = {
					message,
					statusCode,
					result: statusCode === 200 ? response.data[operationName] : response.data,
				}
     		return response
			},
			// formatError: (error: GraphQLError) => {
			// 	const graphQLFormattedError: GraphQLFormattedError = {
      //     message: error?.extensions?.response?.message || error?.message,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
		UserModule,
		PostModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
