import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentObject } from './student';

@ObjectType()
export class GenderObject {
  @Field(() => Int)
  genderid: number;

  @Field()
  gendername: string;

  @Field(() => [StudentObject], { nullable: true })
  student?: StudentObject[];
}
