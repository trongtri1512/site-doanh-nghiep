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
  Newspaper,
  Images,
  MessageSquare,
  ArrowRight,
  Star,
  Users,
  Mail,
  Info,
  FileText,
  MapPin,
  Play,
  HelpCircle,
  Briefcase,
  Camera,
  Phone,
  Settings
} from "lucide-react";
import { PageElement } from "./UniversalPageBuilder";

interface PageElementToolboxProps {
  onAddElement: (type: PageElement['type']) => void;
  pageType: "homepage" | "about" | "careers" | "contact" | "news";
}

export function ElementToolbox({ onAddElement, pageType }: PageElementToolboxProps) {
  // Common sections for all pages
  const commonSections = [
    {
      type: "hero" as const,
      label: "Hero Section",
      icon: <Sparkles className="h-5 w-5" />,
      description: "Banner chính với tiêu đề và CTA"
    },
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
      type: "gallery" as const,
      label: "Gallery",
      icon: <Images className="h-5 w-5" />,
      description: "Thư viện hình ảnh"
    },
    {
      type: "video" as const,
      label: "Video",
      icon: <Play className="h-5 w-5" />,
      description: "Video embed"
    },
    {
      type: "cta" as const,
      label: "Call to Action",
      icon: <ArrowRight className="h-5 w-5" />,
      description: "Kêu gọi hành động"
    },
    {
      type: "testimonials" as const,
      label: "Testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Đánh giá khách hàng"
    },
    {
      type: "faq" as const,
      label: "FAQ",
      icon: <HelpCircle className="h-5 w-5" />,
      description: "Câu hỏi thường gặp"
    }
  ];

  // Page-specific sections
  const pageSpecificSections = {
    homepage: [
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
      },
      {
        type: "features" as const,
        label: "Features",
        icon: <Star className="h-5 w-5" />,
        description: "Tính năng nổi bật"
      },
      {
        type: "team" as const,
        label: "Team",
        icon: <Users className="h-5 w-5" />,
        description: "Đội ngũ"
      }
    ],
    about: [
      {
        type: "about" as const,
        label: "Giới thiệu công ty",
        icon: <Info className="h-5 w-5" />,
        description: "Tổng quan công ty với hình ảnh"
      },
      {
        type: "vision_mission" as const,
        label: "Tầm nhìn & Sứ mệnh",
        icon: <Sparkles className="h-5 w-5" />,
        description: "Tầm nhìn và Sứ mệnh của công ty"
      },
      {
        type: "core_values" as const,
        label: "Giá trị cốt lõi",
        icon: <Star className="h-5 w-5" />,
        description: "4 giá trị cốt lõi của doanh nghiệp"
      },
      {
        type: "business_sectors" as const,
        label: "Lĩnh vực kinh doanh",
        icon: <Briefcase className="h-5 w-5" />,
        description: "Các mảng: Ảnh & In ấn, Mẹ & Bé, Mỹ phẩm, Y tế"
      },
      {
        type: "team" as const,
        label: "Team",
        icon: <Users className="h-5 w-5" />,
        description: "Đội ngũ"
      },
      {
        type: "stats" as const,
        label: "Statistics",
        icon: <BarChart3 className="h-5 w-5" />,
        description: "Thống kê thành tích"
      }
    ],
    careers: [
      {
        type: "about" as const,
        label: "Company Culture",
        icon: <Users className="h-5 w-5" />,
        description: "Văn hóa công ty"
      },
      {
        type: "services" as const,
        label: "Benefits",
        icon: <Star className="h-5 w-5" />,
        description: "Quyền lợi nhân viên"
      },
      {
        type: "stats" as const,
        label: "Company Stats",
        icon: <BarChart3 className="h-5 w-5" />,
        description: "Thống kê công ty"
      }
    ],
    contact: [
      {
        type: "contact" as const,
        label: "Contact Info",
        icon: <Phone className="h-5 w-5" />,
        description: "Thông tin liên hệ"
      },
      {
        type: "form" as const,
        label: "Contact Form",
        icon: <FileText className="h-5 w-5" />,
        description: "Biểu mẫu liên hệ"
      },
      {
        type: "map" as const,
        label: "Map",
        icon: <MapPin className="h-5 w-5" />,
        description: "Bản đồ vị trí"
      }
    ],
    news: [
      {
        type: "news" as const,
        label: "News List",
        icon: <Newspaper className="h-5 w-5" />,
        description: "Danh sách tin tức"
      }
    ]
  };

  const layoutOptions = [
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

  const currentPageSections = pageSpecificSections[pageType] || [];

  return (
    <div className="space-y-4">
      {/* Page Specific Sections */}
      {currentPageSections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Sections chuyên biệt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentPageSections.map((section) => (
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
      )}

      {/* Common Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sections chung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {commonSections.map((section) => (
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

      {/* Layout Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Bố cục</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {layoutOptions.map((layout, index) => (
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