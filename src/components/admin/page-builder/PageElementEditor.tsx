import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { PageElement } from "./UniversalPageBuilder";

interface PageElementEditorProps {
  element: PageElement;
  onUpdate: (updates: Partial<PageElement>) => void;
  onClose: () => void;
}

export function PageElementEditor({ element, onUpdate, onClose }: PageElementEditorProps) {
  const [content, setContent] = useState(element.content);
  const [styles, setStyles] = useState(element.styles || {});
  const [title, setTitle] = useState(element.title || "");

  useEffect(() => {
    setContent(element.content);
    setStyles(element.styles || {});
    setTitle(element.title || "");
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

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onUpdate({ title: newTitle });
  };

  const handleArrayUpdate = (arrayKey: string, index: number, field: string, value: any) => {
    const array = content[arrayKey] || [];
    const newArray = [...array];
    newArray[index] = { ...newArray[index], [field]: value };
    handleContentChange(arrayKey, newArray);
  };

  const handleArrayAdd = (arrayKey: string, defaultItem: any) => {
    const array = content[arrayKey] || [];
    handleContentChange(arrayKey, [...array, defaultItem]);
  };

  const handleArrayRemove = (arrayKey: string, index: number) => {
    const array = content[arrayKey] || [];
    const newArray = array.filter((_, i) => i !== index);
    handleContentChange(arrayKey, newArray);
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
                rows={6}
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
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-button-text">Text nút</Label>
              <Input
                id="hero-button-text"
                value={content.buttonText || ""}
                onChange={(e) => handleContentChange("buttonText", e.target.value)}
                placeholder="Tìm hiểu thêm"
              />
            </div>
            <div>
              <Label htmlFor="hero-button-url">Link nút</Label>
              <Input
                id="hero-button-url"
                value={content.buttonUrl || ""}
                onChange={(e) => handleContentChange("buttonUrl", e.target.value)}
                placeholder="#"
              />
            </div>
            <div>
              <Label htmlFor="hero-bg-image">Hình nền</Label>
              <Input
                id="hero-bg-image"
                value={content.backgroundImage || ""}
                onChange={(e) => handleContentChange("backgroundImage", e.target.value)}
                placeholder="URL hình nền"
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-title">Tiêu đề</Label>
              <Input
                id="about-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Tiêu đề section"
              />
            </div>
            <div>
              <Label htmlFor="about-content">Nội dung</Label>
              <Textarea
                id="about-content"
                value={content.content || ""}
                onChange={(e) => handleContentChange("content", e.target.value)}
                placeholder="Nội dung giới thiệu..."
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="about-image">Hình ảnh</Label>
              <Input
                id="about-image"
                value={content.image || ""}
                onChange={(e) => handleContentChange("image", e.target.value)}
                placeholder="URL hình ảnh"
              />
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-title">Tiêu đề</Label>
              <Input
                id="contact-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Liên hệ"
              />
            </div>
            <div>
              <Label htmlFor="contact-description">Mô tả</Label>
              <Textarea
                id="contact-description"
                value={content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                placeholder="Mô tả thông tin liên hệ"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contact-address">Địa chỉ</Label>
              <Input
                id="contact-address"
                value={content.address || ""}
                onChange={(e) => handleContentChange("address", e.target.value)}
                placeholder="Địa chỉ công ty"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Điện thoại</Label>
              <Input
                id="contact-phone"
                value={content.phone || ""}
                onChange={(e) => handleContentChange("phone", e.target.value)}
                placeholder="Số điện thoại"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                value={content.email || ""}
                onChange={(e) => handleContentChange("email", e.target.value)}
                placeholder="Email liên hệ"
              />
            </div>
            <div>
              <Label htmlFor="contact-hours">Giờ làm việc</Label>
              <Input
                id="contact-hours"
                value={content.workingHours || ""}
                onChange={(e) => handleContentChange("workingHours", e.target.value)}
                placeholder="Thời gian làm việc"
              />
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="faq-title">Tiêu đề</Label>
              <Input
                id="faq-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Câu hỏi thường gặp"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Danh sách FAQ</Label>
                <Button
                  size="sm"
                  onClick={() => handleArrayAdd("items", { question: "", answer: "" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm
                </Button>
              </div>
              {(content.items || []).map((item: any, index: number) => (
                <div key={index} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">FAQ #{index + 1}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove("items", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={item.question || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "question", e.target.value)}
                    placeholder="Câu hỏi"
                  />
                  <Textarea
                    value={item.answer || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "answer", e.target.value)}
                    placeholder="Câu trả lời"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-title">Tiêu đề</Label>
              <Input
                id="video-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Tiêu đề video"
              />
            </div>
            <div>
              <Label htmlFor="video-url">URL Video</Label>
              <Input
                id="video-url"
                value={content.url || ""}
                onChange={(e) => handleContentChange("url", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <Label htmlFor="video-thumbnail">Hình thumbnail</Label>
              <Input
                id="video-thumbnail"
                value={content.thumbnail || ""}
                onChange={(e) => handleContentChange("thumbnail", e.target.value)}
                placeholder="URL hình thumbnail"
              />
            </div>
            <div>
              <Label htmlFor="video-description">Mô tả</Label>
              <Textarea
                id="video-description"
                value={content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                placeholder="Mô tả video"
                rows={3}
              />
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="services-title">Tiêu đề</Label>
              <Input
                id="services-title"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Dịch vụ"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Danh sách dịch vụ</Label>
                <Button
                  size="sm"
                  onClick={() => handleArrayAdd("items", { title: "", description: "", icon: "star" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm
                </Button>
              </div>
              {(content.items || []).map((item: any, index: number) => (
                <div key={index} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dịch vụ #{index + 1}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove("items", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={item.title || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "title", e.target.value)}
                    placeholder="Tên dịch vụ"
                  />
                  <Textarea
                    value={item.description || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "description", e.target.value)}
                    placeholder="Mô tả dịch vụ"
                    rows={2}
                  />
                  <Input
                    value={item.icon || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "icon", e.target.value)}
                    placeholder="Icon (star, heart, etc.)"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Editor cho loại section "{element.type}" chưa được hỗ trợ</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">
          Chỉnh sửa: {element.type}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Section Title */}
        <div>
          <Label htmlFor="section-title">Tiêu đề Section</Label>
          <Input
            id="section-title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Tiêu đề của section"
          />
        </div>
        
        <Separator />
        
        {/* Content Editor */}
        <div>
          <h3 className="text-sm font-medium mb-4">Nội dung</h3>
          {renderContentEditor()}
        </div>
        
        <Separator />
        
        {/* Style Editor */}
        <div>
          <h3 className="text-sm font-medium mb-4">Kiểu dáng</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={styles.margin || ""}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
                placeholder="e.g., 20px 0"
              />
            </div>
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={styles.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="e.g., 40px 20px"
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