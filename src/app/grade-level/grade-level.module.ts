import { Module } from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelResolver } from './grade-level.resolver';

@Module({
  providers: [GradeLevelResolver, GradeLevelService],
})
export class GradeLevelModule {}
