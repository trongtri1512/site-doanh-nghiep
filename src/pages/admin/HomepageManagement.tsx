import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, GripVertical, Eye, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HomepageManagement = () => {
  const [activeTab, setActiveTab] = useState("vi");
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<any[]>([]);
  const [heroContent, setHeroContent] = useState<any>({});
  const [statsData, setStatsData] = useState<any[]>([]);

  // Load data from database
  useEffect(() => {
    loadHomepageData();
  }, [activeTab]);

  const loadHomepageData = async () => {
    setLoading(true);
    try {
      // Load homepage layouts for current language
      const { data: layouts, error: layoutsError } = await supabase
        .from('homepage_layouts')
        .select('*')
        .eq('language_code', activeTab)
        .order('display_order');

      if (layoutsError) throw layoutsError;

      setSections(layouts || []);

      // Load specific content for hero and stats sections
      const heroSection = layouts?.find(layout => layout.section_type === 'hero');
      const statsSection = layouts?.find(layout => layout.section_type === 'stats');

      if (heroSection) {
        setHeroContent(heroSection.content || {});
      } else {
        // Set default hero content
        setHeroContent({
          title: activeTab === "vi" ? "Đối tác tin cậy trong lĩnh vực sản phẩm tiêu dùng" : "Trusted Partner in Consumer Products",
          subtitle: activeTab === "vi" ? "IMV mang đến những sản phẩm chất lượng cao từ các thương hiệu hàng đầu thế giới" : "IMV brings high-quality products from world-leading brands",
          backgroundImage: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
          ctaText: activeTab === "vi" ? "Khám phá sản phẩm" : "Explore Products",
          ctaLink: "/brands"
        });
      }

      if (statsSection && statsSection.content && typeof statsSection.content === 'object') {
        const content = statsSection.content as any;
        setStatsData(content.stats || []);
      } else {
        // Set default stats data
        setStatsData(activeTab === "vi" ? [
          { label: "Năm kinh nghiệm", value: "20+", icon: "calendar" },
          { label: "Thương hiệu đối tác", value: "50+", icon: "handshake" },
          { label: "Sản phẩm", value: "1000+", icon: "package" },
          { label: "Khách hàng hài lòng", value: "99%", icon: "smile" }
        ] : [
          { label: "Years of Experience", value: "20+", icon: "calendar" },
          { label: "Partner Brands", value: "50+", icon: "handshake" },
          { label: "Products", value: "1000+", icon: "package" },
          { label: "Customer Satisfaction", value: "99%", icon: "smile" }
        ]);
      }
    } catch (error) {
      console.error('Error loading homepage data:', error);
      toast.error('Lỗi khi tải dữ liệu trang chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_layouts')
        .upsert({
          section_type: 'hero',
          language_code: activeTab,
          title: 'Hero Section',
          content: heroContent,
          is_active: true,
          display_order: 1
        }, {
          onConflict: 'section_type,language_code'
        });

      if (error) throw error;

      toast.success('Đã lưu Hero Section thành công');
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast.error('Lỗi khi lưu Hero Section');
    }
  };

  const handleSaveStats = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_layouts')
        .upsert({
          section_type: 'stats',
          language_code: activeTab,
          title: 'Statistics',
          content: { stats: statsData },
          is_active: true,
          display_order: 2
        }, {
          onConflict: 'section_type,language_code'
        });

      if (error) throw error;

      toast.success('Đã lưu thống kê thành công');
    } catch (error) {
      console.error('Error saving stats:', error);
      toast.error('Lỗi khi lưu thống kê');
    }
  };

  const toggleSection = async (sectionId: string) => {
    try {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      const { error } = await supabase
        .from('homepage_layouts')
        .update({ is_active: !section.is_active })
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, is_active: !s.is_active } : s
      ));

      toast.success('Đã cập nhật trạng thái section');
    } catch (error) {
      console.error('Error toggling section:', error);
      toast.error('Lỗi khi cập nhật section');
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      const { error } = await supabase
        .from('homepage_layouts')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.filter(s => s.id !== sectionId));
      toast.success('Đã xóa section thành công');
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Lỗi khi xóa section');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Đang tải...</div>;
  }

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 w-fit">
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6 mt-6">

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
                  <TableCell className="font-medium">{section.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{section.section_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={section.is_active}
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
                value={heroContent.title || ''}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Phụ đề</Label>
              <Textarea
                id="hero-subtitle"
                value={heroContent.subtitle || ''}
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
                value={heroContent.ctaText || ''}
                onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="cta-link">Link nút CTA</Label>
              <Input
                id="cta-link"
                value={heroContent.ctaLink || ''}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomepageManagement;