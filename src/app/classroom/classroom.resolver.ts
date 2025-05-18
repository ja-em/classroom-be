import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ClassroomService } from './classroom.service';
import { ClassroomObject, ClassroomPaginationObject } from 'types/object';
import {
  CreateClassroomInput,
  GetAllClassroomInput,
  UpdateClassroomInput,
} from 'types/input/classroom';

@Resolver(() => ClassroomObject)
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Mutation(() => ClassroomObject)
  createClassroom(@Args('input') createClassroomInput: CreateClassroomInput) {
    return this.classroomService.create(createClassroomInput);
  }

  @Query(() => ClassroomPaginationObject, { name: 'getAllClassroom' })
  findAll(@Args('input', { nullable: true }) input?: GetAllClassroomInput) {
    return this.classroomService.findAll(input);
  }

  @Query(() => ClassroomObject, { name: 'classroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classroomService.findOne(id);
  }

  @Mutation(() => ClassroomObject)
  updateClassroom(@Args('input') updateClassroomInput: UpdateClassroomInput) {
    return this.classroomService.update(updateClassroomInput);
  }

  @Mutation(() => ClassroomObject)
  removeClassroom(@Args('id', { type: () => Int }) id: number) {
    return this.classroomService.remove(id);
  }
}
