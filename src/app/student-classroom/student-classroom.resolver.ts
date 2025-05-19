import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StudentClassroomService } from './student-classroom.service';
import {
  StudentClassroomObject,
  StudentClassroomPaginationObject,
} from 'types/object';

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

  // @ResolveField(() => StudentObject)
  // student(@Parent() parent: StudentClassroomObject) {
  //   console.log({ parent });

  //   return parent.student;
  // }
}
