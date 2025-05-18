import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentObject, StudentPaginationObject } from 'types/object';
import {
  CreateStudentInput,
  GetAllStudentInput,
  UpdateStudentInput,
} from 'types/input';

@Resolver(() => StudentObject)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentObject)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => StudentPaginationObject)
  getStudents(@Args('input', { nullable: true }) args?: GetAllStudentInput) {
    return this.studentService.findAll(args);
  }

  @Query(() => StudentObject, { name: 'getStudentById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => StudentObject)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.studentid,
      updateStudentInput,
    );
  }

  @Mutation(() => StudentObject)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
