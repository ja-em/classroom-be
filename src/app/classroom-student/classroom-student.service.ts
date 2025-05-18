import { Injectable } from '@nestjs/common';
import { CreateClassroomStudentInput } from './dto/create-classroom-student.input';
import { UpdateClassroomStudentInput } from './dto/update-classroom-student.input';

@Injectable()
export class ClassroomStudentService {
  create(createClassroomStudentInput: CreateClassroomStudentInput) {
    return 'This action adds a new classroomStudent';
  }

  findAll() {
    return `This action returns all classroomStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classroomStudent`;
  }

  update(id: number, updateClassroomStudentInput: UpdateClassroomStudentInput) {
    return `This action updates a #${id} classroomStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroomStudent`;
  }
}
