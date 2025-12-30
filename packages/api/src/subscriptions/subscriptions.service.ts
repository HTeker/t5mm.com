import { Injectable, Logger } from '@nestjs/common';
import { SubscriptionProps } from '@t5mm-com/shared';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { SubscriptionsEntity } from './subscriptions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  subscriptions: SubscriptionProps[] = [];

  constructor(
    @InjectRepository(SubscriptionsEntity)
    private subscriptionsRepository: Repository<SubscriptionsEntity>,
    private readonly subscribersService: SubscribersService,
  ) {}

  async findOne(
    subscription: Pick<SubscriptionProps, 'subscriberEmail' | 'newsletter'>,
  ): Promise<SubscriptionsEntity | null> {
    return this.subscriptionsRepository.findOne({
      where: {
        subscriber: { email: subscription.subscriberEmail },
        newsletter: subscription.newsletter,
      },
    });
  }

  async create(
    subscription: Pick<SubscriptionProps, 'subscriberEmail' | 'newsletter'>,
  ): Promise<SubscriptionsEntity> {
    this.logger.log(`Creating subscription: ${JSON.stringify(subscription)}`);

    const subscriber = await this.subscribersService.findOneOrCreate(
      subscription.subscriberEmail,
    );

    return this.subscriptionsRepository.save({
      subscriber: { uuid: subscriber.uuid },
      newsletter: subscription.newsletter,
    });
  }

  async findOneOrCreate(
    subscription: Pick<SubscriptionProps, 'subscriberEmail' | 'newsletter'>,
  ): Promise<SubscriptionsEntity> {
    let _subscription = await this.findOne(subscription);

    if (!_subscription) {
      _subscription = await this.create(subscription);
    }

    return _subscription;
  }
}
