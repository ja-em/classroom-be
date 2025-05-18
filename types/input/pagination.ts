import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page?: number;
  @Field(() => Number, { nullable: true, defaultValue: 10 })
  limit?: number;
}
