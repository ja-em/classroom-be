import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StudentObject } from './student';

@ObjectType()
export class PrefixObject {
  @Field(() => Int)
  prefixid: number;

  @Field()
  prefixname: string;

  @Field(() => [StudentObject], { nullable: true })
  student?: StudentObject[];
}
