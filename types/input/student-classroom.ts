import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStudentClassroomInput {
  @Field(() => Int)
  classroomId: number;

  @Field(() => Int)
  studentId: number;
}
