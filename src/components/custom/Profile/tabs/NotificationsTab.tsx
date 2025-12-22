import {
  updateGeneralNotification,
  updateSecurityNotification,
} from "@/apis/putRequests";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import type { notificationsState } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function NotificationsTab() {
  const { securityNotifications, generalNotifications } = useAuth();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<notificationsState>({
    securityNotification: securityNotifications,
    generalNotification: generalNotifications,
  });

  const securityNotificationsQuery = useMutation({
    mutationKey: ["security-notifications-query"],
    mutationFn: updateSecurityNotification,
    onError: () => {
      toast.error(
        "Internal server error, failed to update preference. Try again later.",
      );
      setNotifications((prev) => ({
        ...prev,
        securityNotifications: !prev.securityNotification,
      }));
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["user-bootstrap"] });
      toast.success("Security preference udpated successfully");
    },
  });

  const generalNotificationsQuery = useMutation({
    mutationKey: ["general-notifications-query"],
    mutationFn: updateGeneralNotification,
    onError: () => {
      toast.error(
        "Internal server error, failed to update preference. Try again later.",
      );
      setNotifications((prev) => ({
        ...prev,
        generalNotifications: !prev.generalNotification,
      }));
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["user-bootstrap"] });
      toast.success("General preference udpated successfully");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Security Email Alerts</Label>
              <p className="text-muted-foreground text-sm">
                Important security mails, OTPs (always enabled)
              </p>
            </div>
            <Switch checked disabled />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Security Notifications</Label>
              <p className="text-muted-foreground text-sm">
                Receive notifications in browser for events like login, session
                expiry etc.
              </p>
            </div>
            <Switch
              checked={notifications.securityNotification}
              onCheckedChange={(e) => {
                setNotifications({
                  ...notifications,
                  securityNotification: e,
                });

                securityNotificationsQuery.mutate();
              }}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-muted-foreground text-sm">
                Receive notifications in browser for events like transactions,
                account creation etc.
              </p>
            </div>
            <Switch
              checked={notifications.generalNotification}
              onCheckedChange={(e) => {
                setNotifications({
                  ...notifications,
                  generalNotification: e,
                });

                generalNotificationsQuery.mutate();
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
