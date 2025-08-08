import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit3, 
  Check, 
  X, 
  Plus, 
  Trash2,
  Upload,
  Settings,
  GripVertical
} from "lucide-react";
import { PageElement } from "./UniversalPageBuilder";
import { cn } from "@/lib/utils";

interface InlineEditableElementProps {
  element: PageElement;
  onUpdate: (updates: Partial<PageElement>) => void;
  onDelete: () => void;
  isPreview?: boolean;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export function InlineEditableElement({ 
  element, 
  onUpdate, 
  onDelete, 
  isPreview = false,
  isDragging = false,
  dragHandleProps
}: InlineEditableElementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(element.content);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate({ content: tempContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(element.content);
    setIsEditing(false);
  };

  const handleContentChange = (key: string, value: any) => {
    setTempContent(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayUpdate = (arrayKey: string, index: number, field: string, value: any) => {
    const array = tempContent[arrayKey] || [];
    const newArray = [...array];
    newArray[index] = { ...newArray[index], [field]: value };
    setTempContent(prev => ({ ...prev, [arrayKey]: newArray }));
  };

  const handleArrayAdd = (arrayKey: string, defaultItem: any) => {
    const array = tempContent[arrayKey] || [];
    setTempContent(prev => ({ ...prev, [arrayKey]: [...array, defaultItem] }));
  };

  const handleArrayRemove = (arrayKey: string, index: number) => {
    const array = tempContent[arrayKey] || [];
    const newArray = array.filter((_, i) => i !== index);
    setTempContent(prev => ({ ...prev, [arrayKey]: newArray }));
  };

  // Handle click outside to save
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, tempContent]);

  const renderEditingContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Textarea
              value={tempContent.text || ""}
              onChange={(e) => handleContentChange("text", e.target.value)}
              placeholder="Nhập nội dung text..."
              className="min-h-[100px]"
              autoFocus
            />
          </div>
        );

      case "hero":
        return (
          <div className="space-y-3">
            <Input
              value={tempContent.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Tiêu đề hero"
              className="text-lg font-bold"
            />
            <Textarea
              value={tempContent.subtitle || ""}
              onChange={(e) => handleContentChange("subtitle", e.target.value)}
              placeholder="Mô tả ngắn gọn"
              rows={2}
            />
            <div className="flex gap-2">
              <Input
                value={tempContent.buttonText || ""}
                onChange={(e) => handleContentChange("buttonText", e.target.value)}
                placeholder="Text nút"
                className="flex-1"
              />
              <Input
                value={tempContent.buttonUrl || ""}
                onChange={(e) => handleContentChange("buttonUrl", e.target.value)}
                placeholder="Link nút"
                className="flex-1"
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-3">
            <Input
              value={tempContent.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Tiêu đề"
              className="font-bold"
            />
            <Textarea
              value={tempContent.content || ""}
              onChange={(e) => handleContentChange("content", e.target.value)}
              placeholder="Nội dung giới thiệu..."
              rows={4}
            />
            <Input
              value={tempContent.image || ""}
              onChange={(e) => handleContentChange("image", e.target.value)}
              placeholder="URL hình ảnh"
            />
          </div>
        );

      case "contact":
        return (
          <div className="space-y-2">
            <Input
              value={tempContent.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Tiêu đề"
              className="font-bold"
            />
            <Input
              value={tempContent.address || ""}
              onChange={(e) => handleContentChange("address", e.target.value)}
              placeholder="Địa chỉ"
            />
            <div className="flex gap-2">
              <Input
                value={tempContent.phone || ""}
                onChange={(e) => handleContentChange("phone", e.target.value)}
                placeholder="Điện thoại"
                className="flex-1"
              />
              <Input
                value={tempContent.email || ""}
                onChange={(e) => handleContentChange("email", e.target.value)}
                placeholder="Email"
                className="flex-1"
              />
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-3">
            <Input
              value={tempContent.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Tiêu đề FAQ"
              className="font-bold"
            />
            <div className="space-y-2">
              {(tempContent.items || []).map((item: any, index: number) => (
                <div key={index} className="border rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">FAQ #{index + 1}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleArrayRemove("items", index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    value={item.question || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "question", e.target.value)}
                    placeholder="Câu hỏi"
                    className="text-sm"
                  />
                  <Textarea
                    value={item.answer || ""}
                    onChange={(e) => handleArrayUpdate("items", index, "answer", e.target.value)}
                    placeholder="Câu trả lời"
                    rows={2}
                    className="text-sm"
                  />
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleArrayAdd("items", { question: "", answer: "" })}
                className="w-full"
              >
                <Plus className="h-3 w-3 mr-1" />
                Thêm FAQ
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-4 text-muted-foreground">
            <p>Inline editing chưa hỗ trợ cho loại "{element.type}"</p>
          </div>
        );
    }
  };

  const renderDisplayContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="p-4">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: element.content?.text?.replace(/\n/g, '<br>') || "Nhập nội dung văn bản..." 
              }}
            />
          </div>
        );

      case "hero":
        return (
          <div 
            className="relative p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg"
            style={{
              backgroundImage: element.content?.backgroundImage ? `url(${element.content.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {element.content?.backgroundImage && (
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
            )}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-4 text-foreground">
                {element.content?.title || "Hero Title"}
              </h1>
              <p className="text-lg mb-6 text-muted-foreground">
                {element.content?.subtitle || "Hero subtitle"}
              </p>
              {element.content?.buttonText && (
                <Button size="lg">
                  {element.content.buttonText}
                </Button>
              )}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {element.content?.title || "About Title"}
                </h2>
                <div 
                  className="prose prose-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: element.content?.content?.replace(/\n/g, '<br>') || "About content..." 
                  }}
                />
              </div>
              {element.content?.image && (
                <div>
                  <img 
                    src={element.content.image} 
                    alt="About" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {element.content?.title || "Contact Info"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {element.content?.address && (
                <div className="flex items-start gap-2">
                  <span className="text-primary">📍</span>
                  <span>{element.content.address}</span>
                </div>
              )}
              {element.content?.phone && (
                <div className="flex items-start gap-2">
                  <span className="text-primary">📞</span>
                  <span>{element.content.phone}</span>
                </div>
              )}
              {element.content?.email && (
                <div className="flex items-start gap-2">
                  <span className="text-primary">✉️</span>
                  <span>{element.content.email}</span>
                </div>
              )}
              {element.content?.workingHours && (
                <div className="flex items-start gap-2">
                  <span className="text-primary">🕒</span>
                  <span>{element.content.workingHours}</span>
                </div>
              )}
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              {element.content?.title || "FAQ"}
            </h2>
            <div className="space-y-4">
              {(element.content?.items || []).map((item: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 text-center text-muted-foreground">
            <p>{element.type} - {element.title || "Untitled"}</p>
          </div>
        );
    }
  };

  if (isPreview) {
    return (
      <div className="w-full">
        {renderDisplayContent()}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group transition-all duration-200",
        isEditing && "ring-2 ring-primary ring-offset-2",
        isDragging && "opacity-50 rotate-2"
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Control Overlay */}
      {(hovering || isEditing) && !isPreview && (
        <div className="absolute -top-3 left-0 right-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-background border rounded-full px-2 py-1 shadow-sm">
            <div 
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
              {...dragHandleProps}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {element.title || element.type}
            </span>
          </div>
          
          <div className="flex items-center gap-1 bg-background border rounded-full px-1 py-1 shadow-sm">
            {isEditing ? (
              <>
                <Button size="sm" variant="ghost" onClick={handleSave}>
                  <Check className="h-3 w-3 text-green-600" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  <X className="h-3 w-3 text-red-600" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onDelete}>
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <Card className={cn(
        "transition-all duration-200 cursor-pointer",
        hovering && !isEditing && "shadow-md",
        isEditing && "shadow-lg"
      )}>
        {isEditing ? (
          <div className="p-4">
            {renderEditingContent()}
          </div>
        ) : (
          <div onClick={() => !isPreview && setIsEditing(true)}>
            {renderDisplayContent()}
          </div>
        )}
      </Card>
    </div>
  );
}