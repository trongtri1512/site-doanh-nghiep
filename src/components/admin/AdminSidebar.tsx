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
  Globe,
  Edit3
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
  { title: "Quản lý người dùng", url: "/admin/users", icon: Shield },
];

const pageBuilderItems = [
  { title: "Trang chủ Builder", url: "/admin/homepage-builder", icon: Layout },
  { title: "Giới thiệu Builder", url: "/admin/about-page-builder", icon: Edit3 },
  { title: "Tuyển dụng Builder", url: "/admin/careers-page-builder", icon: Edit3 },
  { title: "Liên hệ Builder", url: "/admin/contact-page-builder", icon: Edit3 },
  { title: "Tin tức Builder", url: "/admin/news-page-builder", icon: Edit3 },
];

const contentItems = [
  { title: "Quản lý Banner", url: "/admin/banner", icon: Image },
  { title: "Quản lý Nhãn hàng", url: "/admin/brands", icon: Package },
  { title: "Tin tức", url: "/admin/news", icon: Newspaper },
  { title: "Nghề nghiệp", url: "/admin/careers", icon: Users },
  { title: "Về chúng tôi", url: "/admin/about", icon: Info },
];

const designItems = [
  { title: "Quản lý Menu", url: "/admin/menus", icon: Menu },
  { title: "Quản lý liên hệ", url: "/admin/contact", icon: Mail },
  { title: "Ngôn ngữ", url: "/admin/languages", icon: Globe },
  { title: "Header & Logo", url: "/admin/header", icon: Image },
  { title: "Quản lý Footer", url: "/admin/footer", icon: SquareActivity },
  { title: "Menu Footer", url: "/admin/footer-menu", icon: Link },
];

const settingsItems = [
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
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
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">Tổng quan</SidebarGroupLabel>
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

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">Page Builders</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {pageBuilderItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">Nội dung</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {contentItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">Giao diện</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {designItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/80">Cài đặt</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
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
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button 
                      onClick={signOut}
                      className="w-full flex items-center space-x-2 text-destructive hover:bg-destructive/10 text-sidebar-foreground hover:text-destructive"
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