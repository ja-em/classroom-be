import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenderService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.gender.findMany();
  }
}
