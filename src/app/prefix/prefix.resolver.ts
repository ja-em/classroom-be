import { Resolver, Query } from '@nestjs/graphql';
import { PrefixService } from './prefix.service';
import { PrefixObject } from 'types/object';

@Resolver(() => PrefixObject)
export class PrefixResolver {
  constructor(private readonly prefixService: PrefixService) {}

  @Query(() => [PrefixObject], { name: 'getAllPrefix' })
  findAll() {
    return this.prefixService.findAll();
  }
}
