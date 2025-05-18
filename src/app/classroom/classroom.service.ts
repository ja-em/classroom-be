import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateClassroomInput,
  GetAllClassroomInput,
  UpdateClassroomInput,
} from 'types/input/classroom';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassroomService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClassroomInput: CreateClassroomInput) {
    try {
      const newData = await this.prismaService.classroom.create({
        data: createClassroomInput,
      });
      return newData;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(input: GetAllClassroomInput) {
    const keyword = input?.keyword;
    const isNumberKeyword = !Number.isNaN(+keyword);
    let where: Prisma.ClassroomWhereInput = {};
    if (keyword) {
      where = {
        OR: [
          {
            classname: {
              contains: keyword,
            },
          },
          {
            homeroom_teacher: {
              contains: keyword,
            },
          },
          {
            ...(isNumberKeyword && { classroomid: +keyword }),
          },
          {
            ...(isNumberKeyword && { academic_year: +keyword }),
          },
        ],
      };
    }
    const [find, count] = await Promise.all([
      this.prismaService.classroom.findMany({
        where,
        skip: this.prismaService.getSkip(input?.page, input?.limit),
        take: this.prismaService.getLimit(input?.limit),
        orderBy: {
          classroomid: 'desc',
        },
      }),
      this.prismaService.classroom.count({ where }),
    ]);
    return this.prismaService.toPaginationResponse(find, {
      ...input,
      totalItem: count,
    });
  }

  async findOne(id: number) {
    const find = await this.prismaService.classroom.findUnique({
      where: { classroomid: id },
    });
    if (!find) {
      throw new NotFoundException(`Classroom id ${id} not found`);
    }
    return find;
  }

  async update(updateClassroomInput: UpdateClassroomInput) {
    try {
      const { classroomid, ...update } = updateClassroomInput;
      const find = await this.findOne(classroomid);
      const newData = await this.prismaService.classroom.update({
        where: { classroomid: find.classroomid },
        data: update,
      });
      return newData;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async remove(id: number) {
    const find = await this.findOne(id);
    await this.prismaService.classroom.delete({ where: { classroomid: id } });
    return find;
  }
}
