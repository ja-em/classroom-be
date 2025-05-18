import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentClassroomObject } from './student-classroom';

@ObjectType()
export class ClassroomObject {
  @Field(() => Int)
  classroomid: number;

  @Field()
  classname: string;

  @Field(() => Int)
  academic_year: number;

  @Field()
  homeroom_teacher: string;

  @Field(() => [StudentClassroomObject], { nullable: true })
  student_classroom?: StudentClassroomObject[];
}
