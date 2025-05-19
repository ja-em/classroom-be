import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentClassroomInput } from 'types/input';

@Injectable()
export class StudentClassroomService {
  constructor(private readonly prismaService: PrismaService) {}
  async getStudentClassroomByClassroomId(classroomId: number) {
    const find = await this.prismaService.studentClassroom.findMany({
      where: {
        classroomid: classroomId,
      },
      include: {
        student: {
          include: {
            prefix: true,
            gender: true,
            gradelevel: true,
          },
        },
        classroom: true,
      },
    });
    return this.prismaService.toPaginationResponse(find, {
      totalItem: find.length,
    });
  }

  async createStudentClassroom(input: CreateStudentClassroomInput) {
    const find = await this.prismaService.studentClassroom.findFirst({
      where: {
        classroomid: input.classroomId,
        studentid: input.studentId,
      },
    });
    if (find) {
      throw new BadRequestException(`
            The student already in the classroom
            `);
    }
    const create = await this.prismaService.studentClassroom.create({
      data: {
        classroomid: input.classroomId,
        studentid: input.studentId,
      },
    });
    return create;
  }

  async removeStudentClassroom(studentClassroomId: number) {
    const find = await this.prismaService.studentClassroom.findUnique({
      where: { student_classroom_id: studentClassroomId },
    });
    if (!find) {
      throw new NotFoundException(`
            The student classroom id ${studentClassroomId} not found
            `);
    }
    await this.prismaService.studentClassroom.delete({
      where: {
        student_classroom_id: studentClassroomId,
      },
    });
    return find;
  }
}
