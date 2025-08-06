import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Settings, Users, Package } from "lucide-react";

const AdminSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-primary mb-4">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Dành cho quản trị viên</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Hệ thống quản lý nội dung</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Truy cập vào hệ thống quản lý để cập nhật nội dung website, quản lý sản phẩm và theo dõi hoạt động.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-background rounded-lg shadow-sm">
            <Settings className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quản lý nội dung</h3>
            <p className="text-sm text-muted-foreground">
              Cập nhật menu, header, trang chủ và thông tin công ty
            </p>
          </div>
          
          <div className="text-center p-6 bg-background rounded-lg shadow-sm">
            <Package className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quản lý sản phẩm</h3>
            <p className="text-sm text-muted-foreground">
              Thêm, sửa, xóa nhãn hàng và thông tin sản phẩm
            </p>
          </div>
          
          <div className="text-center p-6 bg-background rounded-lg shadow-sm">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quản lý tin tức</h3>
            <p className="text-sm text-muted-foreground">
              Đăng tải và quản lý tin tức, thông báo tuyển dụng
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/admin">
              <Shield className="h-4 w-4 mr-2" />
              Truy cập Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminSection;