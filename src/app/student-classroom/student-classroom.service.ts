import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
