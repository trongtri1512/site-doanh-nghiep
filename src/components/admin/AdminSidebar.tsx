import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  Layout,
  Image,
  Package,
  Newspaper,
  Users,
  Info,
  Settings,
  Home,
  LogOut,
  Link,
  SquareActivity,
  Shield,
  Mail,
  Globe
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

// Cấu trúc menu phân cấp theo UX/UI tối ưu
const adminMenuGroups = [
  {
    title: "Tổng quan",
    items: [
      { title: "Dashboard", url: "/admin", icon: Home, description: "Thống kê tổng quan hệ thống" }
    ]
  },
  {
    title: "Quản lý trang",
    items: [
      { title: "Trang chủ", url: "/admin/homepage-builder", icon: Layout, description: "Thiết kế giao diện trang chủ" },
      { title: "Tin tức", url: "/admin/news", icon: Newspaper, description: "Quản lý bài viết tin tức" },
      { title: "Tuyển dụng", url: "/admin/careers", icon: Users, description: "Quản lý vị trí tuyển dụng" },
      { title: "Giới thiệu", url: "/admin/about", icon: Info, description: "Nội dung về công ty" },
      { title: "Nhãn hàng", url: "/admin/brands", icon: Package, description: "Quản lý thương hiệu sản phẩm" },
      { title: "Banner", url: "/admin/banner", icon: Image, description: "Quản lý hình ảnh banner" },
      { title: "Nội dung Footer", url: "/admin/footer", icon: SquareActivity, description: "Thông tin chân trang" }
    ]
  },
  {
    title: "Quản lý Menu",
    items: [
      { title: "Menu chính", url: "/admin/menus", icon: Menu, description: "Menu điều hướng header" },
      { title: "Menu chân trang", url: "/admin/footer-menu", icon: Link, description: "Liên kết footer" },
      { title: "Header & Logo", url: "/admin/header", icon: Image, description: "Thiết lập header" }
    ]
  },
  {
    title: "Quản lý người dùng",
    items: [
      { title: "Tất cả người dùng", url: "/admin/users", icon: Shield, description: "Danh sách user hệ thống" },
      { title: "Liên hệ", url: "/admin/contact", icon: Mail, description: "Quản lý form liên hệ" }
    ]
  },
  {
    title: "Cài đặt",
    items: [
      { title: "Cài đặt chung", url: "/admin/settings", icon: Settings, description: "Cấu hình hệ thống" },
      { title: "Ngôn ngữ", url: "/admin/languages", icon: Globe, description: "Quản lý đa ngôn ngữ" }
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-60"}
      collapsible="icon"
      variant="sidebar"
    >
      <div className="p-4 border-b mt-12 border-sidebar-border">
        {state !== "collapsed" && (
          <div>
            <h2 className="font-bold text-lg text-sidebar-foreground">Admin Panel</h2>
            <p className="text-sm text-sidebar-foreground/70">{user?.email}</p>
          </div>
        )}
      </div>

        <SidebarContent>
          {adminMenuGroups.map((group, groupIndex) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs font-medium uppercase tracking-wide">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} end className={getNavClass} title={item.description}>
                          <item.icon className="h-4 w-4" />
                          {state !== "collapsed" && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button 
                      onClick={signOut}
                      className="w-full flex items-center space-x-2 text-destructive hover:bg-destructive/10 text-sidebar-foreground hover:text-destructive"
                      title="Đăng xuất khỏi hệ thống"
                    >
                      <LogOut className="h-4 w-4" />
                      {state !== "collapsed" && <span>Đăng xuất</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}