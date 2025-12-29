import { Button } from "@/components/ui/button";
import NotificationCard from "./NotificationCard";
import { ListX } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/apis/getRequests";
import type { notification } from "@/types/types";
import { readNotifications } from "@/apis/putRequests";
import { toast } from "sonner";

export default function Notification() {
  let allNotifications: notification[] | null = null;

  const notificationQuery = useQuery({
    queryKey: ["notification-query"],
    queryFn: getNotifications,
  });

  const readNotification = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: readNotifications,
    onSuccess: () => {
      notificationQuery.refetch();
    },
    onError: () => {
      toast.error(
        "internal server error while clearing notifications, try again later.",
      );
    },
  });

  if (notificationQuery.isSuccess) {
    allNotifications = notificationQuery.data.data;
  }

  if (!allNotifications) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h1>loading....</h1>
      </section>
    );
  }

  if (allNotifications.length === 0) {
    return (
      <section className="flex justify-center h-full py-[25%]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-medium">No new notifications.</h1>
          <span className="mt-4 text-xl text-muted-foreground">¯\_(ツ)_/¯</span>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Button
        variant={"ghost"}
        className="self-end transition-opacity duration-150 ease-out active:scale-90 active:opacity-70 focus:outline-none"
        onClick={() => {
          readNotification.mutate();
        }}
      >
        <ListX />
      </Button>
      <div className="flex flex-col gap-3">
        {allNotifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}
