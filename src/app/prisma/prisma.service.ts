import { PrismaClient } from '@prisma/client';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PaginationInput } from 'types/input';
import { IPaginationResponse } from 'types/interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('DB is connectted');
    } catch (e) {
      this.logger.error(e);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('DB is disconnect');
    } catch (e) {
      this.logger.error(e);
    }
  }

  getPage(page?: number) {
    return Math.max(page ?? 1, 1);
  }

  getSkip(page?: number, limit?: number) {
    const targetPage = this.getPage(page);
    return (targetPage - 1) * this.getLimit(limit);
  }

  getLimit(limit?: number) {
    return Math.max(limit ?? 10, 1);
  }

  toPaginationResponse<T>(
    items: T[],
    { totalItem, page, limit }: PaginationInput & { totalItem: number },
  ): IPaginationResponse<T> {
    const targetPage = this.getPage(page);
    const targetLimit = this.getLimit(limit);
    const totalPage = Math.ceil(totalItem / targetLimit);
    return {
      totalPage,
      page: targetPage,
      limit: targetLimit,
      hasNextPage: targetPage < totalPage,
      hasPreviousPage: targetPage > 1,
      totalItem,
      items,
    };
  }
}
