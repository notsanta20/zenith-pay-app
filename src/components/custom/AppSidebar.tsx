import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bell,
  CreditCard,
  Home,
  Layers,
  SendHorizonal,
  ShieldUser,
} from "lucide-react";
import Logout from "./Logout";

const items = [
  {
    title: "Dashboard",
    url: "/app",
    icon: Home,
  },
  {
    title: "Transfer",
    url: "/app/transfer",
    icon: SendHorizonal,
  },
  {
    title: "Transactions",
    url: "/app/transactions",
    icon: Layers,
  },
  {
    title: "Accounts",
    url: "/app/accounts",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    url: "/app/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "/app/profile",
    icon: ShieldUser,
  },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <img src="/src/assets/icons/infinity.svg" alt="infinity.svg" />
                <span className="font-medium">Zenith Bank</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center">
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
