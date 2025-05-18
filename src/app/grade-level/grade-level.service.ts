import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradeLevelService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll() {
    return this.prismaService.gradeLevel.findMany();
  }
}
