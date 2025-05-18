import { Resolver, Query } from '@nestjs/graphql';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelObject } from 'types/object';

@Resolver(() => GradeLevelObject)
export class GradeLevelResolver {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Query(() => [GradeLevelObject], { name: 'getAllGradeLevel' })
  findAll() {
    return this.gradeLevelService.findAll();
  }
}
