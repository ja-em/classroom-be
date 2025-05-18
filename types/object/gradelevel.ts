import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentObject } from './student';

@ObjectType()
export class GradeLevelObject {
  @Field(() => Int)
  gradelevelid: number;

  @Field()
  levelname: string;

  @Field(() => [StudentObject], { nullable: true })
  student?: StudentObject[];
}
