import {
  Field,
  GraphQLISODateTime,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';
import { PaginationInput } from './pagination';
import { Student } from '@prisma/client';

@InputType()
export class GetAllStudentInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => Number, { nullable: true })
  gradlevelId?: number;
}

@InputType()
export class CreateStudentInput implements Omit<Student, 'studentid'> {
  @Field(() => Int)
  prefixid: number;
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => Int)
  genderid: number;
  @Field(() => GraphQLISODateTime)
  birthdate: Date;
  @Field(() => Int)
  gradelevelid: number | null;
}

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => Int)
  studentid: number;
}
