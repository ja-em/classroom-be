import { Field, InputType, PartialType } from '@nestjs/graphql';
import { PaginationInput } from './pagination';
import { Prisma } from '@prisma/client';

@InputType()
export class GetAllClassroomInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  keyword?: string;
}

@InputType()
export class CreateClassroomInput
  implements Prisma.ClassroomUncheckedCreateInput
{
  @Field(() => String)
  classname: string;
  @Field(() => Number)
  academic_year: number;
  @Field(() => String)
  homeroom_teacher: string;
}

@InputType()
export class UpdateClassroomInput extends PartialType(CreateClassroomInput) {
  @Field(() => Number)
  classroomid: number;
}
