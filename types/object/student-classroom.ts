import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentObject } from './student';
import { ClassroomObject } from './classroom';
import { PaginationResponseBulder } from './pagination';

@ObjectType()
export class StudentClassroomObject {
  @Field(() => Int)
  student_classroom_id: number;

  @Field(() => Int)
  studentid: number;

  @Field(() => Int)
  classroomid: number;

  @Field(() => StudentObject)
  student: StudentObject;

  @Field(() => ClassroomObject)
  classroom: ClassroomObject;
}

@ObjectType()
export class StudentClassroomPaginationObject extends PaginationResponseBulder(
  StudentClassroomObject,
) {}
