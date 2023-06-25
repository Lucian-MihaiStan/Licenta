import { NModels } from '@/components/notifications/notification_model';

export type NotificationProps = {
    notification: NModels.NotificationModel;
    userId: string | string[];
};