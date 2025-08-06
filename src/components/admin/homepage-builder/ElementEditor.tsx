import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { PageElement } from "@/pages/admin/HomepageBuilder";

interface ElementEditorProps {
  element: PageElement;
  onUpdate: (updates: Partial<PageElement>) => void;
  onClose: () => void;
}

export function ElementEditor({ element, onUpdate, onClose }: ElementEditorProps) {
  const [content, setContent] = useState(element.content);
  const [styles, setStyles] = useState(element.styles || {});

  useEffect(() => {
    setContent(element.content);
    setStyles(element.styles || {});
  }, [element]);

  const handleContentChange = (key: string, value: any) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    onUpdate({ content: newContent });
  };

  const handleStyleChange = (key: string, value: any) => {
    const newStyles = { ...styles, [key]: value };
    setStyles(newStyles);
    onUpdate({ styles: newStyles });
  };

  const renderContentEditor = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Nội dung</Label>
              <Textarea
                id="text-content"
                value={content.text || ""}
                onChange={(e) => handleContentChange("text", e.target.value)}
                placeholder="Nhập nội dung text..."
                rows={4}
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">URL Hình ảnh</Label>
              <Input
                id="image-url"
                value={content.url || ""}
                onChange={(e) => handleContentChange("url", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Mô tả hình ảnh</Label>
              <Input
                id="image-alt"
                value={content.alt || ""}
                onChange={(e) => handleContentChange("alt", e.target.value)}
                placeholder="Mô tả hình ảnh"
              />
            </div>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên hình ảnh
            </Button>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Tiêu đề</Label>
              <Input
                id="hero-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Tiêu đề hero section"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Mô tả</Label>
              <Textarea
                id="hero-subtitle"
                value={content.subtitle || ""}
                onChange={(e) => handleContentChange("subtitle", e.target.value)}
                placeholder="Mô tả ngắn gọn"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="hero-cta">Call to Action</Label>
              <Input
                id="hero-cta"
                value={content.cta || ""}
                onChange={(e) => handleContentChange("cta", e.target.value)}
                placeholder="Văn bản nút"
              />
            </div>
            <div>
              <Label htmlFor="hero-bg">Hình nền</Label>
              <Input
                id="hero-bg"
                value={content.backgroundImage || ""}
                onChange={(e) => handleContentChange("backgroundImage", e.target.value)}
                placeholder="URL hình nền"
              />
            </div>
          </div>
        );

      case "stats":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Thống kê</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const newItems = [...(content.items || []), { label: "", value: "" }];
                  handleContentChange("items", newItems);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {content.items?.map((item: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Thống kê {index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newItems = content.items.filter((_: any, i: number) => i !== index);
                      handleContentChange("items", newItems);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={item.label || ""}
                  onChange={(e) => {
                    const newItems = [...content.items];
                    newItems[index] = { ...item, label: e.target.value };
                    handleContentChange("items", newItems);
                  }}
                  placeholder="Nhãn (vd: Khách hàng)"
                />
                <Input
                  value={item.value || ""}
                  onChange={(e) => {
                    const newItems = [...content.items];
                    newItems[index] = { ...item, value: e.target.value };
                    handleContentChange("items", newItems);
                  }}
                  placeholder="Giá trị (vd: 1000+)"
                />
              </div>
            ))}
          </div>
        );

      case "layout":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="layout-columns">Số cột</Label>
              <Input
                id="layout-columns"
                type="number"
                min="1"
                max="6"
                value={content.columns || 2}
                onChange={(e) => handleContentChange("columns", parseInt(e.target.value))}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <p>Không có tùy chọn chỉnh sửa cho loại phần tử này</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Chỉnh sửa {element.type}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Content Editor */}
        <div>
          <h4 className="text-sm font-medium mb-3">Nội dung</h4>
          {renderContentEditor()}
        </div>

        <Separator />

        {/* Style Editor */}
        <div>
          <h4 className="text-sm font-medium mb-3">Kiểu dáng</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="margin">Khoảng cách (margin)</Label>
              <Input
                id="margin"
                value={styles.margin || ""}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
                placeholder="vd: 20px"
              />
            </div>
            <div>
              <Label htmlFor="padding">Đệm (padding)</Label>
              <Input
                id="padding"
                value={styles.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="vd: 16px"
              />
            </div>
            <div>
              <Label htmlFor="background-color">Màu nền</Label>
              <Input
                id="background-color"
                type="color"
                value={styles.backgroundColor || "#ffffff"}
                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}