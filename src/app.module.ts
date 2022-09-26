import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nest-graphql', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			formatResponse(response, requestContext) {
				let message = "SUCCESS"
				let statusCode = 200

				if (response?.errors) {
					// console.log("🚀 ~ file: app.module.ts ~ line 23 ~ formatResponse ~ response?.errors", response?.errors)
					// @ts-ignore
					message = response.errors[0]?.extensions?.response?.message || response.errors[0]?.message || "ERROR"
					// @ts-ignore
					statusCode = response.errors[0]?.extensions?.response?.statusCode || 500
					response.errors = undefined
				}

				// console.log("🚀 ~ file: app.module.ts ~ line 31 ~ formatResponse ~ response.data", response.data)
				response.data = {
					message,
					statusCode,
					...response.data,
				}
				// response.extensions = {...response.extensions, test2: 'Property to test if shown in the FrontEnd'}
				// let responseData = {
				// 	...response,
				// 	test: 'Property to test if shown in the FrontEnd',
				// }
				// console.log("🚀 ~ file: app.module.ts ~ line 19 ~ formatResponse ~ responseData", responseData)
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
