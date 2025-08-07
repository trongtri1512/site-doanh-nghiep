import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Type, 
  Image, 
  Layout, 
  Sparkles, 
  BarChart3,
  Grid2X2,
  Grid3X3,
  Plus,
  Award,
  Newspaper
} from "lucide-react";
import { PageElement } from "@/pages/admin/HomepageBuilder";

interface ElementToolboxProps {
  onAddElement: (type: PageElement['type']) => void;
}

export function ElementToolbox({ onAddElement }: ElementToolboxProps) {
  const homepageSections = [
    {
      type: "hero" as const,
      label: "Hero Section",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Banner chính với tiêu đề và CTA"
    },
    {
      type: "stats" as const,
      label: "Statistics",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Thống kê số liệu công ty"
    },
    {
      type: "brands" as const,
      label: "Brands Section",
      icon: <Award className="h-5 w-5" />,
      description: "Hiển thị các nhãn hàng"
    },
    {
      type: "news" as const,
      label: "News Section",
      icon: <Newspaper className="h-5 w-5" />,
      description: "Tin tức và sự kiện"
    }
  ];

  const basicElements = [
    {
      type: "text" as const,
      label: "Text Block",
      icon: <Type className="h-5 w-5" />,
      description: "Đoạn văn bản"
    },
    {
      type: "image" as const,
      label: "Image",
      icon: <Image className="h-5 w-5" />,
      description: "Hình ảnh đơn"
    },
    {
      type: "layout" as const,
      label: "Layout Grid",
      icon: <Layout className="h-5 w-5" />,
      description: "Bố cục nhiều cột"
    }
  ];

  const layouts = [
    {
      type: "layout",
      label: "2 Cột",
      icon: <Grid2X2 className="h-4 w-4" />,
      columns: 2
    },
    {
      type: "layout", 
      label: "3 Cột",
      icon: <Grid3X3 className="h-4 w-4" />,
      columns: 3
    }
  ];

  return (
    <div className="space-y-4">
      {/* Homepage Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sections Trang chủ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {homepageSections.map((section) => (
            <Button
              key={section.type}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => onAddElement(section.type)}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">{section.icon}</div>
                <div className="text-left">
                  <div className="text-sm font-medium">{section.label}</div>
                  <div className="text-xs text-muted-foreground">{section.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Basic Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Thành phần cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {basicElements.map((element) => (
            <Button
              key={element.type}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => onAddElement(element.type)}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">{element.icon}</div>
                <div className="text-left">
                  <div className="text-sm font-medium">{element.label}</div>
                  <div className="text-xs text-muted-foreground">{element.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Layout Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Bố cục</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {layouts.map((layout, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => onAddElement("layout")}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">{layout.icon}</div>
                <div className="text-left">
                  <div className="text-sm font-medium">{layout.label}</div>
                  <div className="text-xs text-muted-foreground">Layout {layout.columns} cột</div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full" onClick={() => onAddElement("text")}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm text
          </Button>
          <Button variant="outline" className="w-full" onClick={() => onAddElement("image")}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm hình ảnh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}