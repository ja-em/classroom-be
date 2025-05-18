import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassroomStudentService } from './classroom-student.service';
import { ClassroomStudent } from './entities/classroom-student.entity';
import { CreateClassroomStudentInput } from './dto/create-classroom-student.input';
import { UpdateClassroomStudentInput } from './dto/update-classroom-student.input';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentResolver {
  constructor(
    private readonly classroomStudentService: ClassroomStudentService
  ) {}

  @Mutation(() => ClassroomStudent)
  createClassroomStudent(
    @Args('createClassroomStudentInput')
    createClassroomStudentInput: CreateClassroomStudentInput
  ) {
    return this.classroomStudentService.create(createClassroomStudentInput);
  }

  @Query(() => [ClassroomStudent], { name: 'classroomStudent' })
  findAll() {
    return this.classroomStudentService.findAll();
  }

  @Query(() => ClassroomStudent, { name: 'classroomStudent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classroomStudentService.findOne(id);
  }

  @Mutation(() => ClassroomStudent)
  updateClassroomStudent(
    @Args('updateClassroomStudentInput')
    updateClassroomStudentInput: UpdateClassroomStudentInput
  ) {
    return this.classroomStudentService.update(
      updateClassroomStudentInput.id,
      updateClassroomStudentInput
    );
  }

  @Mutation(() => ClassroomStudent)
  removeClassroomStudent(@Args('id', { type: () => Int }) id: number) {
    return this.classroomStudentService.remove(id);
  }
}
