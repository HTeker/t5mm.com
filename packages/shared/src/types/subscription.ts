import { BaseEntityProps } from "./base"
import { NewsletterEnum } from "./newsletter"

export interface SubscriptionProps extends BaseEntityProps {
  subscriberUuid: string;
  subscriberEmail: string;
  newsletter: NewsletterEnum;
}

export interface CreateSubscriptionsRequest {
	email: string
	newsletters: NewsletterEnum[]
}