import { Module } from '@nestjs/common';
import { StudentClassroomService } from './student-classroom.service';
import { StudentClassroomResolver } from './student-classroom.resolver';

@Module({
  providers: [StudentClassroomResolver, StudentClassroomService],
})
export class StudentClassroomModule {}
