import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationResponse } from '../interface';

export function PaginationResponseBulder<TItem>(TItemClass: new () => TItem) {
  @ObjectType({ isAbstract: true })
  abstract class PaginationResponseClass implements IPaginationResponse<TItem> {
    @Field(() => [TItemClass])
    items: TItem[];
    @Field(() => Number)
    totalItem: number;
    @Field(() => Number)
    totalPage: number;
    @Field(() => Number)
    page: number;
    @Field(() => Number)
    limit: number;
    @Field(() => Boolean)
    hasNextPage: boolean;
    @Field(() => Boolean)
    hasPreviousPage: boolean;
  }

  return PaginationResponseClass;
}
