import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "./tabs/PersonalTab";
import AccounstTab from "./tabs/AccounstTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SecurityTab from "./tabs/SecurityTab";

export default function ProfileContent() {
  return (
    <section>
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4 rounded-md">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalTab />
        </TabsContent>

        <TabsContent value="account">
          <AccounstTab />
        </TabsContent>

        <TabsContent value="security">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="notifications">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
