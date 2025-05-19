import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentClassroomService } from './student-classroom.service';
import {
  StudentClassroomObject,
  StudentClassroomPaginationObject,
} from 'types/object';
import { CreateStudentClassroomInput } from 'types/input';

@Resolver(() => StudentClassroomObject)
export class StudentClassroomResolver {
  constructor(
    private readonly studentClassroomService: StudentClassroomService,
  ) {}
  @Query(() => StudentClassroomPaginationObject)
  getStudentClassroomByClassroomId(
    @Args('classroomId', { type: () => Int }) classroomId: number,
  ) {
    return this.studentClassroomService.getStudentClassroomByClassroomId(
      classroomId,
    );
  }

  @Mutation(() => StudentClassroomObject)
  createStudentClassroom(@Args('input') input: CreateStudentClassroomInput) {
    return this.studentClassroomService.createStudentClassroom(input);
  }

  @Mutation(() => StudentClassroomObject)
  removeStudentClassroom(
    @Args('studentClassroomId', { type: () => Int! }) id: number,
  ) {
    return this.studentClassroomService.removeStudentClassroom(id);
  }
}
