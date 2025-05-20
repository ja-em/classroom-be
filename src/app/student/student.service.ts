import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Prisma } from '@prisma/client';
import {
  CreateStudentInput,
  GetAllStudentInput,
  UpdateStudentInput,
} from 'types/input';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  private async validateBeforeCreate(createStudentInput: CreateStudentInput) {
    const res = await Promise.all([
      this.prismaService.gender.findUnique({
        where: { genderid: createStudentInput.genderid },
      }),
      this.prismaService.prefix.findUnique({
        where: { prefixid: createStudentInput.prefixid },
      }),
      this.prismaService.gradeLevel.findUnique({
        where: { gradelevelid: createStudentInput.genderid },
      }),
    ]);
    const error: string[] = [];
    res.forEach((r, i) => {
      if (!r && i == 0) {
        error.push('Invalid gender id');
      }
      if (!r && i == 1) {
        error.push('Invalid prefix id');
      }
      if (!r && i == 2) {
        error.push('Invalid grade level id');
      }
    });
    if (error.length !== 0) {
      throw new BadRequestException(error.join(','));
    }
  }

  async create(createStudentInput: CreateStudentInput) {
    await this.validateBeforeCreate(createStudentInput);
    const newStudent = await this.prismaService.student.create({
      data: createStudentInput,
    });
    return newStudent;
  }

  async findAll(args?: GetAllStudentInput) {
    const keyword = args?.keyword;
    const whereKeyword: Prisma.StudentWhereInput = {
      OR: [
        {
          firstname: {
            contains: keyword,
          },
        },
        {
          lastname: {
            contains: keyword,
          },
        },
        {
          ...(keyword &&
            !Number.isNaN(+keyword) && {
              studentid: {
                equals: +keyword,
              },
            }),
        },
      ],
    };
    const allWhere: Prisma.StudentWhereInput = {
      ...(keyword && whereKeyword),
      ...(args?.gradlevelId && {
        gradelevelid: args.gradlevelId,
      }),
    };
    const [find, count] = await Promise.all([
      this.prismaService.student.findMany({
        where: allWhere,
        skip: this.prismaService.getSkip(args?.page, args?.limit),
        take: this.prismaService.getLimit(args?.limit),
        orderBy: {
          studentid: 'desc',
        },
        include: {
          gradelevel: true,
          prefix: true,
          gender: true,
          student_classroom: true,
        },
      }),
      this.prismaService.student.count({
        where: allWhere,
      }),
    ]);

    return this.prismaService.toPaginationResponse(find, {
      ...args,
      totalItem: count,
    });
  }

  async findOne(id: number) {
    const student = await this.prismaService.student.findUnique({
      where: {
        studentid: id,
      },
    });
    if (!student) {
      throw new NotFoundException(`Not found student id ${id}`);
    }
    return student;
  }

  private async validateBeforeUpdate(updateStudentInput: UpdateStudentInput) {
    if (updateStudentInput.genderid) {
      const gender = await this.prismaService.gender.findUnique({
        where: { genderid: updateStudentInput.genderid },
      });
      if (!gender) {
        throw new BadRequestException(
          `Not found gender id ${updateStudentInput.genderid}`,
        );
      }
    }

    if (updateStudentInput.prefixid) {
      const prefix = await this.prismaService.prefix.findUnique({
        where: { prefixid: updateStudentInput.prefixid },
      });
      if (!prefix) {
        throw new BadRequestException(
          `Not found prefix id ${updateStudentInput.prefixid}`,
        );
      }
    }

    if (updateStudentInput.gradelevelid) {
      const gradelevel = await this.prismaService.gradeLevel.findUnique({
        where: { gradelevelid: updateStudentInput.gradelevelid },
      });
      if (!gradelevel) {
        throw new BadRequestException(
          `Not found gradelevel id ${updateStudentInput.gradelevelid}`,
        );
      }
    }
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    const student = await this.findOne(id);
    await this.validateBeforeUpdate(updateStudentInput);
    const updateStudent = await this.prismaService.student.update({
      where: { studentid: id },
      data: {
        ...student,
        ...updateStudentInput,
      },
    });
    return updateStudent;
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    const findClassroom = await this.prismaService.studentClassroom.findMany({
      where: {
        studentid: student.studentid,
      },
      include: {
        classroom: true,
      },
    });
    if (findClassroom.length !== 0) {
      throw new BadRequestException(
        `This student is currently in classroom ` +
          findClassroom.map((e) => e.classroom.classname).join(', '),
      );
    }
    await this.prismaService.student.delete({ where: { studentid: id } });
    return student;
  }
}
