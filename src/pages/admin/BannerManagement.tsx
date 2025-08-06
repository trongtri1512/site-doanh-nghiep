import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Save, Eye, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const BannerManagement = () => {
  const [bannerData, setBannerData] = useState({
    title: "CHÀO MỪNG BẠN\nĐẾN VỚI IMV\nVIETNAM",
    buttonText: "Tìm hiểu thêm về Công ty chúng tôi",
    buttonLink: "/about",
    backgroundImage: "/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png",
    isActive: true
  });

  const handleSave = () => {
    // Placeholder for saving banner data
    toast.success("Banner đã được cập nhật thành công!");
    console.log("Saving banner data:", bannerData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder for image upload
      const imageUrl = URL.createObjectURL(file);
      setBannerData(prev => ({ ...prev, backgroundImage: imageUrl }));
      toast.success("Hình ảnh đã được tải lên!");
    }
  };

  const handlePreview = () => {
    // Open homepage in new tab for preview
    window.open("/", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Banner</h1>
          <p className="text-muted-foreground">
            Chỉnh sửa nội dung và hình ảnh banner trang chủ
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePreview} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Nội dung Banner</CardTitle>
            <CardDescription>
              Chỉnh sửa tiêu đề và nút call-to-action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề chính</Label>
              <Textarea
                id="title"
                placeholder="Nhập tiêu đề banner..."
                value={bannerData.title}
                onChange={(e) => setBannerData(prev => ({ ...prev, title: e.target.value }))}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Sử dụng Enter để xuống dòng
              </p>
            </div>

            <div>
              <Label htmlFor="buttonText">Text nút CTA</Label>
              <Input
                id="buttonText"
                placeholder="Nhập text cho nút..."
                value={bannerData.buttonText}
                onChange={(e) => setBannerData(prev => ({ ...prev, buttonText: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="buttonLink">Link nút CTA</Label>
              <Input
                id="buttonLink"
                placeholder="/about"
                value={bannerData.buttonLink}
                onChange={(e) => setBannerData(prev => ({ ...prev, buttonLink: e.target.value }))}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Image Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh Banner</CardTitle>
            <CardDescription>
              Upload và quản lý hình nền banner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Hình ảnh hiện tại</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img
                  src={bannerData.backgroundImage}
                  alt="Banner Background"
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="imageUpload">Tải lên hình ảnh mới</Label>
              <div className="mt-2">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click để tải lên hình ảnh mới
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Khuyến nghị: 1920x600px, định dạng JPG/PNG
                    </p>
                  </div>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Hoặc nhập URL hình ảnh</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={bannerData.backgroundImage}
                onChange={(e) => setBannerData(prev => ({ ...prev, backgroundImage: e.target.value }))}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Xem trước Banner
          </CardTitle>
          <CardDescription>
            Xem trước banner như nó sẽ hiển thị trên trang chủ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={bannerData.backgroundImage}
              alt="Banner Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-lg">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      {bannerData.title.split('\n').map((line, index) => (
                        <span key={index} className="block">{line}</span>
                      ))}
                    </h2>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      {bannerData.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerManagement;