import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminLayout = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          {/* Header with trigger - always visible */}
          <header className="fixed top-0 left-0 right-0 h-12 bg-background border-b z-50 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="ml-4" />
              <h1 className="ml-4 font-semibold">Admin Panel</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-4"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </header>
          
          <AdminSidebar />
          
          <main className="flex-1 pt-12 p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminLayout;