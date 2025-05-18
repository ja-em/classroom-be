import { CreateClassroomStudentInput } from './create-classroom-student.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassroomStudentInput extends PartialType(
  CreateClassroomStudentInput
) {
  @Field(() => Int)
  id: number;
}
