import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, GripVertical, Eye, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const HomepageManagement = () => {
  const [sections, setSections] = useState([
    { id: 1, name: "Hero Section", type: "hero", active: true, order: 1 },
    { id: 2, name: "Thống kê", type: "stats", active: true, order: 2 },
    { id: 3, name: "Nhãn hàng đồng hành", type: "brands", active: true, order: 3 },
    { id: 4, name: "Tin tức mới nhất", type: "news", active: true, order: 4 },
  ]);

  const [heroContent, setHeroContent] = useState({
    title: "Đối tác tin cậy trong lĩnh vực sản phẩm tiêu dùng",
    subtitle: "IMV mang đến những sản phẩm chất lượng cao từ các thương hiệu hàng đầu thế giới",
    backgroundImage: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
    ctaText: "Khám phá sản phẩm",
    ctaLink: "/brands"
  });

  const [statsData, setStatsData] = useState([
    { label: "Năm kinh nghiệm", value: "20+", icon: "calendar" },
    { label: "Thương hiệu đối tác", value: "50+", icon: "handshake" },
    { label: "Sản phẩm", value: "1000+", icon: "package" },
    { label: "Khách hàng hài lòng", value: "99%", icon: "smile" }
  ]);

  const handleSaveHero = () => {
    console.log("Saving hero content:", heroContent);
  };

  const handleSaveStats = () => {
    console.log("Saving stats:", statsData);
  };

  const toggleSection = (id: number) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, active: !section.active } : section
    ));
  };

  const deleteSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Trang chủ</h1>
          <p className="text-muted-foreground">Tùy chỉnh layout và nội dung trang chủ</p>
        </div>
        <Button>
          <Eye className="h-4 w-4 mr-2" />
          Xem trang chủ
        </Button>
      </div>

      {/* Quản lý sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sections trang chủ</CardTitle>
              <CardDescription>Quản lý thứ tự và hiển thị các phần</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm section
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm section mới</DialogTitle>
                  <DialogDescription>Tạo một phần mới cho trang chủ</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="section-name">Tên section</Label>
                    <Input id="section-name" placeholder="Nhập tên section" />
                  </div>
                  <div>
                    <Label htmlFor="section-type">Loại section</Label>
                    <Input id="section-type" placeholder="hero, stats, brands, news..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Hủy</Button>
                  <Button>Thêm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Thứ tự</TableHead>
                <TableHead>Tên section</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <span>{section.order}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{section.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{section.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={section.active}
                      onCheckedChange={() => toggleSection(section.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hero Section Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Chỉnh sửa phần đầu trang chủ</CardDescription>
            </div>
            <Button onClick={handleSaveHero}>
              <Save className="h-4 w-4 mr-2" />
              Lưu Hero
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="hero-title">Tiêu đề chính</Label>
              <Input
                id="hero-title"
                value={heroContent.title}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Phụ đề</Label>
              <Textarea
                id="hero-subtitle"
                value={heroContent.subtitle}
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="cta-text">Text nút CTA</Label>
              <Input
                id="cta-text"
                value={heroContent.ctaText}
                onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="cta-link">Link nút CTA</Label>
              <Input
                id="cta-link"
                value={heroContent.ctaLink}
                onChange={(e) => setHeroContent({...heroContent, ctaLink: e.target.value})}
              />
            </div>
          </div>
          <div>
            <Label>Hình nền Hero</Label>
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Thay đổi hình nền
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Thống kê</CardTitle>
              <CardDescription>Chỉnh sửa các số liệu thống kê</CardDescription>
            </div>
            <Button onClick={handleSaveStats}>
              <Save className="h-4 w-4 mr-2" />
              Lưu thống kê
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {statsData.map((stat, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div>
                  <Label>Nhãn</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...statsData];
                      newStats[index].label = e.target.value;
                      setStatsData(newStats);
                    }}
                  />
                </div>
                <div>
                  <Label>Giá trị</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...statsData];
                      newStats[index].value = e.target.value;
                      setStatsData(newStats);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageManagement;