import type { notification } from "@/types/types";
import { formatDateExtended } from "@/utils/formatDate";

export default function NotificationCard({
  notification,
}: {
  notification: notification;
}) {
  return (
    <div className="bg-card border border-input rounded-md p-3 flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">
        {formatDateExtended(notification.timeStamp)}
      </span>
      <span className="flex-1">{notification.message}</span>
    </div>
  );
}
