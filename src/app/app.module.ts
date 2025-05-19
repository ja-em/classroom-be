import { Global, HttpException, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StudentModule } from './student/student.module';
import { GraphQLError } from 'graphql';
import { GradeLevelModule } from './grade-level/grade-level.module';
import { PrefixModule } from './prefix/prefix.module';
import { GenderModule } from './gender/gender.module';
import { ClassroomModule } from './classroom/classroom.module';
import { ConfigModule } from '@nestjs/config';
import { StudentClassroomModule } from './student-classroom/student-classroom.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: (context: { req: object; res: object }) => ({
        req: context.req,
        res: context.res,
      }),

      formatError: (formattedError, error) => {
        const { path } = formattedError;
        let message = 'Internal server error';
        let statusCode = 500;

        if (error instanceof HttpException) {
          const response = error.getResponse();
          statusCode = error.getStatus();

          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object' && 'message' in response) {
            message = response['message'] as string;
          }
        } else if ((error as { message?: any })?.message) {
          message = (error as { message?: any }).message;
        }

        return new GraphQLError(message, {
          path,
          extensions: {
            code: 'Request Error',
            statusCode,
            message,
          },
        });
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [PrismaModule],
})
class GlobalModule {}

@Module({
  imports: [
    GlobalModule,
    StudentModule,
    GradeLevelModule,
    PrefixModule,
    GenderModule,
    ClassroomModule,
    StudentClassroomModule,
  ],
})
export class AppModule {}
