import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Menu,
  Layout,
  Image,
  Package,
  Newspaper,
  Users,
  Info,
  BarChart3
} from "lucide-react";

const AdminDashboard = () => {
  const quickActions = [
    {
      title: "Quản lý Menu",
      description: "Chỉnh sửa menu chính và menu trên cùng",
      icon: Menu,
      link: "/admin/menus",
      color: "text-blue-600"
    },
    {
      title: "Header & Logo",
      description: "Cập nhật logo và header website",
      icon: Image,
      link: "/admin/header",
      color: "text-green-600"
    },
    {
      title: "Giao diện trang chủ",
      description: "Tùy chỉnh layout và nội dung trang chủ",
      icon: Layout,
      link: "/admin/homepage",
      color: "text-purple-600"
    },
    {
      title: "Nhãn hàng",
      description: "Quản lý thông tin các nhãn hàng",
      icon: Package,
      link: "/admin/brands",
      color: "text-orange-600"
    },
    {
      title: "Tin tức",
      description: "Tạo và chỉnh sửa tin tức",
      icon: Newspaper,
      link: "/admin/news",
      color: "text-red-600"
    },
    {
      title: "Nghề nghiệp",
      description: "Quản lý thông tin tuyển dụng",
      icon: Users,
      link: "/admin/careers",
      color: "text-cyan-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển Admin</h1>
          <p className="text-muted-foreground">Quản lý nội dung website IMV</p>
        </div>
        <Button asChild>
          <Link to="/">
            Xem website
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng nhãn hàng</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+1 từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tin tức</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vị trí tuyển dụng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 vị trí mới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Thao tác nhanh</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={action.link}>Quản lý</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;