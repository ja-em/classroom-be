import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrefixObject } from './prefix';
import { GenderObject } from './gender';
import { GradeLevelObject } from './gradelevel';
import { StudentClassroomObject } from './student-classroom';
import { PaginationResponseBulder } from './pagination';

@ObjectType()
export class StudentObject {
  @Field(() => Int)
  studentid: number;

  @Field(() => Int, { nullable: true })
  prefixid?: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => Int, { nullable: true })
  genderid?: number;

  @Field()
  birthdate: Date;

  @Field(() => Int, { nullable: true })
  gradelevelid?: number;

  @Field(() => PrefixObject, { nullable: true })
  prefix?: PrefixObject;

  @Field(() => GenderObject, { nullable: true })
  gender?: GenderObject;

  @Field(() => GradeLevelObject, { nullable: true })
  gradelevel?: GradeLevelObject;

  @Field(() => [StudentClassroomObject], { nullable: true })
  student_classroom?: StudentClassroomObject[];
}

@ObjectType()
export class StudentPaginationObject extends PaginationResponseBulder(
  StudentObject
) {}
