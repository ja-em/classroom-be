import { Resolver, Query } from '@nestjs/graphql';
import { GenderService } from './gender.service';
import { GenderObject } from 'types/object';

@Resolver(() => GenderObject)
export class GenderResolver {
  constructor(private readonly genderService: GenderService) {}

  @Query(() => [GenderObject], { name: 'getAllGender' })
  findAll() {
    return this.genderService.findAll();
  }
}
