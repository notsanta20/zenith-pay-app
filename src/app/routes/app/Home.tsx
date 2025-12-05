import AppSidebar from "@/components/custom/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="px-5 py-5 flex flex-col"></SidebarInset>
    </SidebarProvider>
  );
}

export default Home;
