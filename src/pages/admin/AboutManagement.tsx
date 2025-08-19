import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, Image } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutManagement = () => {
  const [aboutContent, setAboutContent] = useState({
    heroTitle: "Về chúng tôi",
    heroSubtitle: "IMV - Đối tác tin cậy trong lĩnh vực phân phối sản phẩm tiêu dùng",
    introduction: "Công ty TNHH IMV được thành lập với sứ mệnh mang đến những sản phẩm chất lượng cao từ các thương hiệu hàng đầu thế giới đến tay người tiêu dùng Việt Nam...",
    mission: "Mang đến những sản phẩm chất lượng cao, an toàn và phù hợp với nhu cầu của người tiêu dùng Việt Nam.",
    vision: "Trở thành công ty phân phối hàng đầu Việt Nam trong lĩnh vực sản phẩm tiêu dùng, được khách hàng và đối tác tin tưởng.",
    values: "Chất lượng - Uy tín - Đổi mới - Phát triển bền vững",
    companyImage: "/src/assets/imv-building.png",
    businessImage: "/src/assets/our-business.png"
  });

  const [brandPartners, setBrandPartners] = useState([
    { id: 1, name: "Pigeon", description: "Sản phẩm chăm sóc mẹ và bé từ Nhật Bản" },
    { id: 2, name: "Verites", description: "Mỹ phẩm cao cấp cho giới trẻ" },
    { id: 3, name: "Instax Camera", description: "Máy ảnh chụp lấy liền Fujifilm" },
    { id: 4, name: "Fujifilm Image", description: "Giải pháp in ảnh chuyên nghiệp" },
    { id: 5, name: "Etsuko", description: "Chăm sóc bé từ khi chào đời" },
    { id: 6, name: "Astalift", description: "Mỹ phẩm chống lão hóa Fujifilm" }
  ]);

  const [distributedProducts, setDistributedProducts] = useState([
    { id: 1, category: "Sản phẩm chăm sóc mẹ và bé", products: "Bình sữa, ty ngậm, đồ chơi an toàn" },
    { id: 2, category: "Mỹ phẩm và làm đẹp", products: "Kem dưỡng da, serum, mặt nạ" },
    { id: 3, category: "Máy ảnh và phụ kiện", products: "Máy ảnh Instax, film, phụ kiện" },
    { id: 4, category: "Sản phẩm in ảnh", products: "Giấy ảnh, máy in chuyên nghiệp" },
    { id: 5, category: "Thời trang", products: "Quần áo, phụ kiện thời trang" }
  ]);

  const handleSaveAbout = () => {
    console.log("Saving about content:", aboutContent);
  };

  const handleSaveBrands = () => {
    console.log("Saving brand partners:", brandPartners);
  };

  const handleSaveProducts = () => {
    console.log("Saving distributed products:", distributedProducts);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Về chúng tôi</h1>
          <p className="text-muted-foreground">Chỉnh sửa nội dung trang giới thiệu công ty</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Thông tin chung</TabsTrigger>
          <TabsTrigger value="brands">Thương hiệu đồng hành</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm phân phối</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Thông tin công ty</CardTitle>
                  <CardDescription>Chỉnh sửa thông tin cơ bản về công ty</CardDescription>
                </div>
                <Button onClick={handleSaveAbout}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="hero-title">Tiêu đề chính</Label>
                  <Input
                    id="hero-title"
                    value={aboutContent.heroTitle}
                    onChange={(e) => setAboutContent({...aboutContent, heroTitle: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Phụ đề</Label>
                  <Input
                    id="hero-subtitle"
                    value={aboutContent.heroSubtitle}
                    onChange={(e) => setAboutContent({...aboutContent, heroSubtitle: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="introduction">Giới thiệu chung</Label>
                <Textarea
                  id="introduction"
                  value={aboutContent.introduction}
                  onChange={(e) => setAboutContent({...aboutContent, introduction: e.target.value})}
                  rows={5}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="mission">Sứ mệnh</Label>
                  <Textarea
                    id="mission"
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Tầm nhìn</Label>
                  <Textarea
                    id="vision"
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="values">Giá trị cốt lõi</Label>
                  <Textarea
                    id="values"
                    value={aboutContent.values}
                    onChange={(e) => setAboutContent({...aboutContent, values: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Hình ảnh công ty</Label>
                  <div className="mt-2 space-y-2">
                    <img 
                      src={aboutContent.companyImage} 
                      alt="Company" 
                      className="w-full h-32 object-cover rounded border"
                    />
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Thay đổi hình ảnh
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Hình ảnh hoạt động kinh doanh</Label>
                  <div className="mt-2 space-y-2">
                    <img 
                      src={aboutContent.businessImage} 
                      alt="Business" 
                      className="w-full h-32 object-cover rounded border"
                    />
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Thay đổi hình ảnh
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Thương hiệu đồng hành</CardTitle>
                  <CardDescription>Quản lý danh sách các thương hiệu đối tác</CardDescription>
                </div>
                <Button onClick={handleSaveBrands}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {brandPartners.map((brand, index) => (
                <div key={brand.id} className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`brand-name-${index}`}>Tên thương hiệu</Label>
                    <Input
                      id={`brand-name-${index}`}
                      value={brand.name}
                      onChange={(e) => {
                        const newBrands = [...brandPartners];
                        newBrands[index].name = e.target.value;
                        setBrandPartners(newBrands);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`brand-desc-${index}`}>Mô tả</Label>
                    <Input
                      id={`brand-desc-${index}`}
                      value={brand.description}
                      onChange={(e) => {
                        const newBrands = [...brandPartners];
                        newBrands[index].description = e.target.value;
                        setBrandPartners(newBrands);
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const newId = Math.max(...brandPartners.map(b => b.id)) + 1;
                  setBrandPartners([...brandPartners, { 
                    id: newId, 
                    name: "", 
                    description: "" 
                  }]);
                }}
              >
                Thêm thương hiệu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sản phẩm phân phối</CardTitle>
                  <CardDescription>Quản lý danh mục sản phẩm phân phối</CardDescription>
                </div>
                <Button onClick={handleSaveProducts}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {distributedProducts.map((product, index) => (
                <div key={product.id} className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`product-category-${index}`}>Danh mục</Label>
                    <Input
                      id={`product-category-${index}`}
                      value={product.category}
                      onChange={(e) => {
                        const newProducts = [...distributedProducts];
                        newProducts[index].category = e.target.value;
                        setDistributedProducts(newProducts);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`product-list-${index}`}>Sản phẩm</Label>
                    <Input
                      id={`product-list-${index}`}
                      value={product.products}
                      onChange={(e) => {
                        const newProducts = [...distributedProducts];
                        newProducts[index].products = e.target.value;
                        setDistributedProducts(newProducts);
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const newId = Math.max(...distributedProducts.map(p => p.id)) + 1;
                  setDistributedProducts([...distributedProducts, { 
                    id: newId, 
                    category: "", 
                    products: "" 
                  }]);
                }}
              >
                Thêm danh mục sản phẩm
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutManagement;