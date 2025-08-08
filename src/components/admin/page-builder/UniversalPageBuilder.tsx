import { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageSortableItem } from "./PageSortableItem";
import { ElementToolbox } from "./PageElementToolbox";
import { PageElementEditor } from "./PageElementEditor";
import { InlineEditableElement } from "./InlineEditableElement";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageElement {
  id: string;
  type: "hero" | "stats" | "brands" | "news" | "text" | "image" | "layout" | "gallery" | "testimonials" | "cta" | "features" | "team" | "contact" | "about" | "form" | "map" | "video" | "faq" | "services" | "portfolio" | "vision_mission" | "core_values" | "business_sectors";
  content: any;
  styles?: any;
  section_type?: string;
  title?: string;
  display_order?: number;
  is_active?: boolean;
}

interface UniversalPageBuilderProps {
  pageType: "homepage" | "about" | "careers" | "contact" | "news";
  pageTitle: string;
}

export const UniversalPageBuilder = ({ pageType, pageTitle }: UniversalPageBuilderProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<PageElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("vi");
  const queryClient = useQueryClient();

  // Fetch page layouts from database
  const { data: layouts = [], isLoading } = useQuery({
    queryKey: ['page-layouts', pageType, activeLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_layouts')
        .select('*')
        .eq('page_type', pageType)
        .eq('is_active', true)
        .eq('language_code', activeLanguage)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Convert database layouts to PageElements
  const [elements, setElements] = useState<PageElement[]>([]);

  useEffect(() => {
    if (layouts) {
      const convertedElements = layouts.map(layout => ({
        id: layout.id,
        type: layout.section_type as PageElement['type'],
        content: layout.content,
        styles: layout.styles,
        section_type: layout.section_type,
        title: layout.title,
        display_order: layout.display_order,
        is_active: layout.is_active
      }));
      setElements(convertedElements);
    }
  }, [layouts]);

  // Save page layout mutation
  const saveLayoutMutation = useMutation({
    mutationFn: async (elements: PageElement[]) => {
      // Update existing elements
      for (const element of elements) {
        const { error } = await supabase
          .from('page_layouts')
          .update({
            content: element.content,
            styles: element.styles,
            display_order: element.display_order,
            is_active: element.is_active
          })
          .eq('id', element.id);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Layout đã được lưu thành công!");
      queryClient.invalidateQueries({ queryKey: ['page-layouts', pageType, activeLanguage] });
    },
    onError: (error) => {
      console.error("Error saving layout:", error);
      toast.error("Có lỗi xảy ra khi lưu layout");
    }
  });

  // Drag and drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setElements((elements) => {
        const oldIndex = elements.findIndex((item) => item.id === active.id);
        const newIndex = elements.findIndex((item) => item.id === over.id);
        
        const newElements = arrayMove(elements, oldIndex, newIndex);
        
        // Update display_order for all elements
        const updatedElements = newElements.map((element, index) => ({
          ...element,
          display_order: index
        }));
        
        return updatedElements;
      });
    }
    
    setActiveId(null);
  }, []);

  // Default content for different element types
  const getDefaultContent = (type: PageElement['type']) => {
    const defaultContents = {
      text: { text: "Nhập nội dung văn bản ở đây..." },
      image: { url: "", alt: "Mô tả hình ảnh" },
      hero: {
        title: "Tiêu đề Hero",
        subtitle: "Mô tả ngắn gọn về trang",
        buttonText: "Tìm hiểu thêm",
        buttonUrl: "#",
        backgroundImage: ""
      },
      stats: {
        items: [
          { label: "Khách hàng", value: "1000+", icon: "users" },
          { label: "Dự án", value: "500+", icon: "briefcase" },
          { label: "Năm kinh nghiệm", value: "10+", icon: "award" }
        ]
      },
      about: {
        title: "Giới thiệu",
        content: "Nội dung giới thiệu về công ty...",
        image: "",
        features: []
      },
      contact: {
        title: "Liên hệ",
        description: "Thông tin liên hệ",
        address: "",
        phone: "",
        email: "",
        workingHours: ""
      },
      form: {
        title: "Biểu mẫu liên hệ",
        fields: [
          { type: "text", name: "name", label: "Họ tên", required: true },
          { type: "email", name: "email", label: "Email", required: true },
          { type: "textarea", name: "message", label: "Tin nhắn", required: true }
        ]
      },
      map: {
        title: "Bản đồ",
        address: "",
        latitude: 10.8231,
        longitude: 106.6297,
        zoom: 15
      },
      video: {
        title: "Video",
        url: "",
        thumbnail: "",
        description: ""
      },
      faq: {
        title: "Câu hỏi thường gặp",
        items: [
          { question: "Câu hỏi 1?", answer: "Câu trả lời 1" },
          { question: "Câu hỏi 2?", answer: "Câu trả lời 2" }
        ]
      },
      services: {
        title: "Dịch vụ",
        items: [
          { title: "Dịch vụ 1", description: "Mô tả dịch vụ 1", icon: "star" },
          { title: "Dịch vụ 2", description: "Mô tả dịch vụ 2", icon: "star" }
        ]
      },
      vision_mission: {
        visionTitle: "Tầm nhìn",
        visionText: "Trở thành đối tác phân phối tiên phong tại Việt Nam.",
        missionTitle: "Sứ mệnh",
        missionText: "Mang đến sản phẩm chất lượng và giá trị bền vững cho khách hàng, đối tác và cộng đồng.",
        image: ""
      },
      core_values: {
        title: "Giá trị cốt lõi",
        items: [
          { title: "Chính trực", description: "Minh bạch, trung thực trong mọi hoạt động." },
          { title: "Tôn trọng", description: "Tôn trọng khách hàng, đối tác và đồng nghiệp." },
          { title: "Hợp tác", description: "Cùng nhau phát triển trên tinh thần win-win." },
          { title: "Sáng tạo", description: "Luôn đổi mới để tạo ra giá trị vượt trội." }
        ]
      },
      business_sectors: {
        title: "Các lĩnh vực kinh doanh",
        items: [
          { title: "Ảnh & In ấn", description: "Giải pháp hình ảnh và in ấn chuyên nghiệp.", image: "", url: "#" },
          { title: "Chăm sóc Mẹ & Bé", description: "Sản phẩm an toàn dành cho mẹ và bé.", image: "", url: "#" },
          { title: "Mỹ phẩm", description: "Mỹ phẩm chăm sóc sắc đẹp chất lượng.", image: "", url: "#" },
          { title: "Y tế", description: "Thiết bị và vật tư y tế đáng tin cậy.", image: "", url: "#" }
        ]
      },
      cta: {
        title: "Kết nối cùng IMV",
        description: "Liên hệ với chúng tôi để hợp tác và phát triển.",
        buttonText: "Liên hệ chúng tôi",
        buttonUrl: "/contact"
      },
      portfolio: {
        title: "Portfolio",
        items: [
          { title: "Dự án 1", image: "", description: "Mô tả dự án 1" },
          { title: "Dự án 2", image: "", description: "Mô tả dự án 2" }
        ]
      }
    };

    return defaultContents[type] || {};
  };

  // Create element mutation
  const createElementMutation = useMutation({
    mutationFn: async (newElement: Omit<PageElement, 'id'>) => {
      const { data, error } = await supabase
        .from('page_layouts')
        .insert({
          page_type: pageType,
          section_type: newElement.type,
          title: newElement.title,
          content: newElement.content,
          styles: newElement.styles || {},
          display_order: newElement.display_order || 0,
          is_active: true,
          language_code: activeLanguage
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      const newElement: PageElement = {
        id: data.id,
        type: data.section_type as PageElement['type'],
        content: data.content,
        styles: data.styles,
        section_type: data.section_type,
        title: data.title,
        display_order: data.display_order,
        is_active: data.is_active
      };
      
      setElements(prev => [...prev, newElement]);
      setEditingElement(newElement);
      toast.success("Đã thêm section mới!");
    },
    onError: (error) => {
      console.error("Error creating element:", error);
      toast.error("Có lỗi xảy ra khi thêm section");
    }
  });

  const getElementTitle = (type: PageElement['type']) => {
    const titles = {
      text: "Văn bản",
      image: "Hình ảnh", 
      hero: "Hero Section",
      stats: "Thống kê",
      about: "Giới thiệu",
      contact: "Liên hệ",
      form: "Biểu mẫu",
      map: "Bản đồ",
      video: "Video",
      faq: "FAQ",
      services: "Dịch vụ",
      portfolio: "Portfolio",
      vision_mission: "Tầm nhìn & Sứ mệnh",
      core_values: "Giá trị cốt lõi",
      business_sectors: "Lĩnh vực kinh doanh",
      cta: "CTA"
    };
    return titles[type] || type;
  };

  const addElement = (type: PageElement['type']) => {
    const defaultContent = getDefaultContent(type);
    const title = getElementTitle(type);
    
    createElementMutation.mutate({
      type,
      title,
      content: defaultContent,
      styles: {},
      display_order: elements.length,
      is_active: true
    });
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (editingElement?.id === id) {
      setEditingElement(null);
    }
    toast.success("Đã xóa section!");
  };

  const saveLayout = () => {
    saveLayoutMutation.mutate(elements);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">{pageTitle} Builder</h1>
            <p className="text-muted-foreground">Kéo thả để sắp xếp các sections</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {previewMode ? "Chế độ chỉnh sửa" : "Xem trước"}
            </Button>
            
            <Button 
              onClick={saveLayout}
              disabled={saveLayoutMutation.isPending}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saveLayoutMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Element Toolbox */}
          {!previewMode && (
            <div className="col-span-3">
              <ElementToolbox onAddElement={addElement} pageType={pageType} />
            </div>
          )}

          {/* Center - Canvas */}
          <div className={previewMode ? "col-span-12" : "col-span-6"}>
            <Card className="min-h-[600px]">
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={elements.map(el => el.id)} 
                  strategy={verticalListSortingStrategy}
                >
                  <div className="p-4 space-y-4">
                    {elements.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>Chưa có sections nào. Thêm sections từ thanh công cụ bên trái.</p>
                      </div>
                    ) : (
                      elements.map((element) => (
                        <InlineEditableElement
                          key={element.id}
                          element={element}
                          isPreview={previewMode}
                          onUpdate={(updates) => updateElement(element.id, updates)}
                          onDelete={() => deleteElement(element.id)}
                        />
                      ))
                    )}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeId && elements.find(el => el.id === activeId) && (
                    <PageSortableItem
                      element={elements.find(el => el.id === activeId)!}
                      isPreview={false}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </Card>
          </div>

          {/* Right Sidebar - Element Editor */}
          {!previewMode && editingElement && (
            <div className="col-span-3">
              <PageElementEditor
                element={editingElement}
                onUpdate={(updates) => updateElement(editingElement.id, updates)}
                onClose={() => setEditingElement(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};