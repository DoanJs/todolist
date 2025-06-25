export interface NotificationModel {
  id: string;
  updateAt: number;
  body: string;
  recevicerIds: string[];
  isRead: boolean;
  createAt: number;
  senderId: string;
  title: string;
  objectId: string
}
