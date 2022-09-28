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
import { ERROR_MESSAGE, STATUS_CODE_200, STATUS_CODE_500, SUCCESS_MESSAGE } from './common/constants';


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
				// console.log("🚀 ~ file: app.module.ts ~ line 32 ~ formatResponse ~ requestContext.request.query", requestContext.request)
				if (requestContext.request.query.startsWith("mutation")) {
					operationName = requestContext.request.query.split(/[{}()]/gmi)[1].trim()
				} else {
					operationName = requestContext.request.query.split("{")[1].trim()
				}
				
				if (operationName.includes('(')) {
					operationName = operationName.split('(')[0]
				}

				let message = SUCCESS_MESSAGE
				let statusCode = STATUS_CODE_200

				if (response?.errors) {
					// @ts-ignore
					message = response.errors[0]?.extensions?.response?.message || response.errors[0]?.message || ERROR_MESSAGE
					// @ts-ignore
					statusCode = response.errors[0]?.extensions?.response?.statusCode || STATUS_CODE_500
					response.errors = undefined
				}

				if (message === SUCCESS_MESSAGE) {
					message = response.data[operationName]?.message || SUCCESS_MESSAGE
					delete response.data[operationName]?.message
					
					statusCode = response.data[operationName]?.statusCode || STATUS_CODE_200
					delete response.data[operationName]?.statusCode
				}

				console.log('------------>', response.data);
				
				response.data = {
					message,
					statusCode,
					// result: message === SUCCESS_MESSAGE ? response.data[operationName] : response.data,
					result: response.data[operationName]?.object || response.data[operationName],
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
