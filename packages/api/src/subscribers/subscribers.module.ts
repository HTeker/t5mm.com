import { Module, OnModuleInit } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersEntity } from './subscribers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersController } from './subscribers.controller';
import { EmailModule } from 'src/email/email.module';
import { SubscribersSubscriber } from './subscribers.subscriber';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribersEntity]), EmailModule],
  providers: [SubscribersService, SubscribersSubscriber],
  controllers: [SubscribersController],
  exports: [SubscribersService],
})
export class SubscribersModule implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    private readonly subscribersSubscriber: SubscribersSubscriber,
  ) {}

  onModuleInit() {
    this.dataSource.subscribers.push(this.subscribersSubscriber);
  }
}
