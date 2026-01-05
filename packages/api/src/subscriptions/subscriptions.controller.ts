import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSubscriptionsRequest } from '@t5mm-com/shared';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  async getSubscriptions(@Query('subscriberUuid') subscriberUuid: string) {
    if (!subscriberUuid) return;
    return this.subscriptionsService.findBySubscriberUuid(subscriberUuid);
  }

  @Post()
  async subscribe(@Body() body: CreateSubscriptionsRequest) {
    const subscriber = await this.subscribersService.findOneOrCreate(
      body.email,
    );

    for (const newsletter of body.newsletters) {
      await this.subscriptionsService.findOneOrCreate({
        subscriberUuid: subscriber.uuid,
        newsletter,
      });
    }
  }
}
