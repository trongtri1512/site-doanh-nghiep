import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Upload, Plus, Trash2 } from "lucide-react";

interface BrandPageElement {
  id: string;
  section_type: string;
  title?: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

interface BrandElementEditorProps {
  element: BrandPageElement;
  onUpdate: (updates: Partial<BrandPageElement>) => void;
  onClose: () => void;
}

export function BrandElementEditor({ element, onUpdate, onClose }: BrandElementEditorProps) {
  const [content, setContent] = useState(element.content || {});
  const [styles, setStyles] = useState(element.styles || {});
  const [title, setTitle] = useState(element.title || "");

  useEffect(() => {
    setContent(element.content || {});
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

  const renderContentEditor = () => {
    switch (element.section_type) {
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
              <Label htmlFor="hero-bg">Hình nền</Label>
              <Input
                id="hero-bg"
                value={content.background_image || ""}
                onChange={(e) => handleContentChange("background_image", e.target.value)}
                placeholder="URL hình nền"
              />
            </div>
            <div>
              <Label htmlFor="hero-cta">Text nút CTA</Label>
              <Input
                id="hero-cta"
                value={content.cta_text || ""}
                onChange={(e) => handleContentChange("cta_text", e.target.value)}
                placeholder="Văn bản nút"
              />
            </div>
            <div>
              <Label htmlFor="hero-link">Link CTA</Label>
              <Input
                id="hero-link"
                value={content.cta_link || ""}
                onChange={(e) => handleContentChange("cta_link", e.target.value)}
                placeholder="/about"
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-desc">Mô tả</Label>
              <Textarea
                id="about-desc"
                value={content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                placeholder="Mô tả chi tiết về thương hiệu..."
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

      case "products":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Sản phẩm</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const newProducts = [...(content.products || []), { 
                    name: "", 
                    description: "",
                    image: "",
                    price: ""
                  }];
                  handleContentChange("products", newProducts);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(content.products || []).map((product: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sản phẩm {index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newProducts = content.products.filter((_: any, i: number) => i !== index);
                      handleContentChange("products", newProducts);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={product.name || ""}
                  onChange={(e) => {
                    const newProducts = [...content.products];
                    newProducts[index] = { ...product, name: e.target.value };
                    handleContentChange("products", newProducts);
                  }}
                  placeholder="Tên sản phẩm"
                />
                <Textarea
                  value={product.description || ""}
                  onChange={(e) => {
                    const newProducts = [...content.products];
                    newProducts[index] = { ...product, description: e.target.value };
                    handleContentChange("products", newProducts);
                  }}
                  placeholder="Mô tả sản phẩm"
                  rows={2}
                />
                <Input
                  value={product.image || ""}
                  onChange={(e) => {
                    const newProducts = [...content.products];
                    newProducts[index] = { ...product, image: e.target.value };
                    handleContentChange("products", newProducts);
                  }}
                  placeholder="URL hình ảnh"
                />
                <Input
                  value={product.price || ""}
                  onChange={(e) => {
                    const newProducts = [...content.products];
                    newProducts[index] = { ...product, price: e.target.value };
                    handleContentChange("products", newProducts);
                  }}
                  placeholder="Giá (tùy chọn)"
                />
              </div>
            ))}
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tính năng</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const newFeatures = [...(content.features || []), { 
                    title: "", 
                    description: "",
                    icon: ""
                  }];
                  handleContentChange("features", newFeatures);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(content.features || []).map((feature: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tính năng {index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newFeatures = content.features.filter((_: any, i: number) => i !== index);
                      handleContentChange("features", newFeatures);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={feature.title || ""}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[index] = { ...feature, title: e.target.value };
                    handleContentChange("features", newFeatures);
                  }}
                  placeholder="Tiêu đề tính năng"
                />
                <Textarea
                  value={feature.description || ""}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[index] = { ...feature, description: e.target.value };
                    handleContentChange("features", newFeatures);
                  }}
                  placeholder="Mô tả tính năng"
                  rows={2}
                />
                <Input
                  value={feature.icon || ""}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[index] = { ...feature, icon: e.target.value };
                    handleContentChange("features", newFeatures);
                  }}
                  placeholder="Icon (tùy chọn)"
                />
              </div>
            ))}
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Hình ảnh</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const newImages = [...(content.images || []), ""];
                  handleContentChange("images", newImages);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(content.images || []).map((image: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={image}
                  onChange={(e) => {
                    const newImages = [...content.images];
                    newImages[index] = e.target.value;
                    handleContentChange("images", newImages);
                  }}
                  placeholder="URL hình ảnh"
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const newImages = content.images.filter((_: string, i: number) => i !== index);
                    handleContentChange("images", newImages);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        );

      case "cta":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cta-desc">Mô tả</Label>
              <Textarea
                id="cta-desc"
                value={content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                placeholder="Mô tả call to action"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="cta-button">Text nút</Label>
              <Input
                id="cta-button"
                value={content.button_text || ""}
                onChange={(e) => handleContentChange("button_text", e.target.value)}
                placeholder="Liên hệ ngay"
              />
            </div>
            <div>
              <Label htmlFor="cta-link">Link</Label>
              <Input
                id="cta-link"
                value={content.button_link || ""}
                onChange={(e) => handleContentChange("button_link", e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-address">Địa chỉ</Label>
              <Textarea
                id="contact-address"
                value={content.address || ""}
                onChange={(e) => handleContentChange("address", e.target.value)}
                placeholder="Địa chỉ công ty"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Số điện thoại</Label>
              <Input
                id="contact-phone"
                value={content.phone || ""}
                onChange={(e) => handleContentChange("phone", e.target.value)}
                placeholder="0123 456 789"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                value={content.email || ""}
                onChange={(e) => handleContentChange("email", e.target.value)}
                placeholder="info@company.com"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Loại section "{element.section_type}" chưa được hỗ trợ chỉnh sửa</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="section-title">Tiêu đề Section</Label>
        <Input
          id="section-title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Tiêu đề section"
        />
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Nội dung</h4>
        {renderContentEditor()}
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Styles</h4>
        <div className="space-y-3">
          <div>
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={styles.margin || ""}
              onChange={(e) => handleStyleChange("margin", e.target.value)}
              placeholder="8px 16px"
            />
          </div>
          <div>
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={styles.padding || ""}
              onChange={(e) => handleStyleChange("padding", e.target.value)}
              placeholder="16px 24px"
            />
          </div>
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <Input
              id="bg-color"
              value={styles.backgroundColor || ""}
              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}