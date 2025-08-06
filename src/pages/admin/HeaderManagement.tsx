import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Image, Save, Eye } from "lucide-react";

const HeaderManagement = () => {
  const [settings, setSettings] = useState({
    logoUrl: "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png",
    logoText: "IMV",
    showLogoText: true,
    headerHeight: "80px",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    stickyHeader: true,
  });

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving header settings:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Header & Logo</h1>
          <p className="text-muted-foreground">Tùy chỉnh header và logo website</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Xem trước
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
            <CardDescription>Cập nhật logo và text logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo hiện tại</Label>
              <div className="mt-2 p-4 border rounded-lg bg-muted/10">
                <img 
                  src={settings.logoUrl} 
                  alt="Current logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logo-upload">Tải lên logo mới</Label>
              <div className="mt-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Chọn file logo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Định dạng: PNG, JPG, SVG. Kích thước tối đa: 2MB
              </p>
            </div>

            <div>
              <Label htmlFor="logo-text">Text logo</Label>
              <Input
                id="logo-text"
                value={settings.logoText}
                onChange={(e) => setSettings({...settings, logoText: e.target.value})}
                placeholder="IMV"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.showLogoText}
                onCheckedChange={(checked) => setSettings({...settings, showLogoText: checked})}
              />
              <Label>Hiển thị text logo</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thiết lập Header</CardTitle>
            <CardDescription>Cấu hình giao diện header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="header-height">Chiều cao header</Label>
              <Input
                id="header-height"
                value={settings.headerHeight}
                onChange={(e) => setSettings({...settings, headerHeight: e.target.value})}
                placeholder="80px"
              />
            </div>

            <div>
              <Label htmlFor="bg-color">Màu nền</Label>
              <div className="flex space-x-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                  className="w-20"
                />
                <Input
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="text-color">Màu chữ</Label>
              <div className="flex space-x-2">
                <Input
                  id="text-color"
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  className="w-20"
                />
                <Input
                  value={settings.textColor}
                  onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.stickyHeader}
                onCheckedChange={(checked) => setSettings({...settings, stickyHeader: checked})}
              />
              <Label>Header dính (sticky)</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Xem trước Header</CardTitle>
          <CardDescription>Xem trước giao diện header với thiết lập hiện tại</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border rounded-lg p-4 flex items-center justify-between"
            style={{ 
              backgroundColor: settings.backgroundColor,
              color: settings.textColor,
              height: settings.headerHeight
            }}
          >
            <div className="flex items-center space-x-3">
              <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
              {settings.showLogoText && (
                <span className="font-bold text-lg">{settings.logoText}</span>
              )}
            </div>
            <nav className="flex space-x-6">
              <span>Trang chủ</span>
              <span>Về chúng tôi</span>
              <span>Các nhãn hàng</span>
              <span>Tin tức</span>
              <span>Nghề nghiệp</span>
            </nav>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeaderManagement;