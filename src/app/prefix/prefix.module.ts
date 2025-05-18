import { Module } from '@nestjs/common';
import { PrefixService } from './prefix.service';
import { PrefixResolver } from './prefix.resolver';

@Module({
  providers: [PrefixResolver, PrefixService],
})
export class PrefixModule {}
