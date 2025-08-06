import { NavLink } from "react-router-dom";
import {
  Menu,
  Layout,
  Image,
  Package,
  Newspaper,
  Users,
  Info,
  Settings,
  Home
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  { title: "Tổng quan", url: "/admin", icon: Home },
  { title: "Quản lý Menu", url: "/admin/menus", icon: Menu },
  { title: "Header & Logo", url: "/admin/header", icon: Image },
  { title: "Giao diện trang chủ", url: "/admin/homepage", icon: Layout },
  { title: "Nhãn hàng", url: "/admin/brands", icon: Package },
  { title: "Tin tức", url: "/admin/news", icon: Newspaper },
  { title: "Nghề nghiệp", url: "/admin/careers", icon: Users },
  { title: "Về chúng tôi", url: "/admin/about", icon: Info },
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <>
      <Sidebar
        className={state === "collapsed" ? "w-14" : "w-60"}
        collapsible="icon"
      >
        <div className="p-4 border-b">
          <SidebarTrigger />
          {state !== "collapsed" && (
            <h2 className="font-bold text-lg mt-2">Admin Panel</h2>
          )}
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Quản lý nội dung</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavClass}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}