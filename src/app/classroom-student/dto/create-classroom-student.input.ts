import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomStudentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
