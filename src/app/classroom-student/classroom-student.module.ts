import { Module } from '@nestjs/common';
import { ClassroomStudentService } from './classroom-student.service';
import { ClassroomStudentResolver } from './classroom-student.resolver';

@Module({
  providers: [ClassroomStudentResolver, ClassroomStudentService],
})
export class ClassroomStudentModule {}
