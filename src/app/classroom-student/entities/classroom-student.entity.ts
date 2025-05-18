import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ClassroomStudent {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
