import AppSidebar from "@/components/custom/AppSidebar";
import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="px-5 py-5 flex flex-col">
        <SiteHeader />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Home;
