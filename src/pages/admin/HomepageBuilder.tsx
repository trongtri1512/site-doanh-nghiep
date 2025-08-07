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
import { Plus, Grip, Edit2, Trash2, Image, Type, LayoutGrid, Save, Eye, EyeOff } from "lucide-react";
import { SortableItem } from "@/components/admin/homepage-builder/SortableItem";
import { ElementToolbox } from "@/components/admin/homepage-builder/ElementToolbox";
import { ElementEditor } from "@/components/admin/homepage-builder/ElementEditor";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageElement {
  id: string;
  type: "hero" | "stats" | "brands" | "news" | "text" | "image" | "layout" | "gallery" | "testimonials" | "cta" | "features" | "team" | "contact";
  content: any;
  styles?: any;
  section_type?: string;
  title?: string;
  display_order?: number;
  is_active?: boolean;
}

const HomepageBuilder = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<PageElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const queryClient = useQueryClient();

  // Fetch homepage layouts from database
  const { data: layouts = [], isLoading } = useQuery({
    queryKey: ['homepage-layouts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_layouts')
        .select('*')
        .eq('is_active', true)
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

  // Save homepage layout mutation
  const saveLayoutMutation = useMutation({
    mutationFn: async (elements: PageElement[]) => {
      // Update existing elements
      for (const element of elements) {
        const { error } = await supabase
          .from('homepage_layouts')
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
      queryClient.invalidateQueries({ queryKey: ['homepage-layouts'] });
    },
    onError: (error) => {
      toast.error("Lỗi khi lưu layout: " + error.message);
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update display order
        return newItems.map((item, index) => ({
          ...item,
          display_order: index
        }));
      });
      toast.success("Đã thay đổi thứ tự sections");
    }
    
    setActiveId(null);
  }, []);

  const getDefaultContent = (type: PageElement['type']) => {
    switch (type) {
      case 'hero':
        return { 
          title: 'CHÀO MỪNG BẠN ĐẾN VỚI IMV VIETNAM', 
          subtitle: 'Nâng tầm cuộc sống, vững vàng tương lai',
          cta_text: 'Tìm hiểu thêm về Công ty chúng tôi',
          cta_link: '/about',
          background_image: '/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png'
        };
      case 'stats':
        return { 
          stats: [
            { number: '29', unit: 'năm', description: 'nâng tầm cuộc sống, vững vàng tương lai' },
            { number: '100%', description: 'năng lượng tái tạo được sử dụng' },
            { number: '7 triệu', description: 'sản phẩm bán ra mỗi ngày' },
            { number: 'Top 1', description: 'nơi làm việc tốt nhất Việt Nam' }
          ]
        };
      case 'brands':
        return {
          title: 'Các nhãn hàng đồng hành',
          subtitle: 'IMV tự hào là đối tác phân phối chính thức của nhiều thương hiệu uy tín hàng đầu thế giới',
          cta_text: 'Tìm hiểu thêm về IMV',
          cta_link: '/about'
        };
      case 'news':
        return {
          title: 'Tin tức & Sự kiện',
          subtitle: 'Cập nhật những tin tức mới nhất từ IMV',
          limit: 3
        };
      case "text":
        return { text: "Nhập nội dung text của bạn ở đây..." };
      case "image":
        return { url: "/placeholder.svg", alt: "Image description" };
      case "layout":
        return { columns: 2, items: [] };
      case "gallery":
        return { 
          title: 'Thư viện hình ảnh',
          images: [
            { url: '/placeholder.svg', alt: 'Hình ảnh 1', caption: 'Mô tả hình ảnh 1' },
            { url: '/placeholder.svg', alt: 'Hình ảnh 2', caption: 'Mô tả hình ảnh 2' }
          ]
        };
      case "testimonials":
        return {
          title: 'Khách hàng nói gì về chúng tôi',
          testimonials: [
            { name: 'Nguyễn Văn A', role: 'Giám đốc', company: 'ABC Corp', content: 'Dịch vụ tuyệt vời...', avatar: '/placeholder.svg' }
          ]
        };
      case "cta":
        return {
          title: 'Sẵn sàng bắt đầu?',
          subtitle: 'Liên hệ với chúng tôi ngay hôm nay',
          cta_text: 'Liên hệ ngay',
          cta_link: '/contact',
          background_color: '#1e40af'
        };
      case "features":
        return {
          title: 'Tính năng nổi bật',
          features: [
            { icon: 'star', title: 'Chất lượng cao', description: 'Sản phẩm chất lượng cao nhất' },
            { icon: 'shield', title: 'Bảo hành', description: 'Bảo hành toàn diện' }
          ]
        };
      case "team":
        return {
          title: 'Đội ngũ của chúng tôi',
          members: [
            { name: 'Nguyễn Văn A', role: 'CEO', bio: 'Mô tả ngắn', image: '/placeholder.svg' }
          ]
        };
      case "contact":
        return {
          title: 'Liên hệ với chúng tôi',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          phone: '(84) 123 456 789',
          email: 'contact@imv.com.vn',
          show_form: true
        };
      default:
        return {};
    }
  };

  // Create new element mutation
  const createElementMutation = useMutation({
    mutationFn: async (newElement: Omit<PageElement, 'id'>) => {
      const { data, error } = await supabase
        .from('homepage_layouts')
        .insert({
          section_type: newElement.type,
          title: newElement.title || getElementTitle(newElement.type),
          content: newElement.content,
          styles: newElement.styles || {},
          display_order: newElement.display_order,
          is_active: true
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-layouts'] });
      toast.success("Đã thêm section mới!");
    },
    onError: (error) => {
      toast.error("Lỗi khi thêm section: " + error.message);
    }
  });

  const getElementTitle = (type: PageElement['type']) => {
    switch (type) {
      case 'hero': return 'Hero Section';
      case 'stats': return 'Thống kê';
      case 'brands': return 'Nhãn hàng';
      case 'news': return 'Tin tức';
      case 'gallery': return 'Thư viện ảnh';
      case 'testimonials': return 'Đánh giá khách hàng';
      case 'cta': return 'Call to Action';
      case 'features': return 'Tính năng';
      case 'team': return 'Đội ngũ';
      case 'contact': return 'Liên hệ';
      default: return 'Section mới';
    }
  };

  const addElement = useCallback((type: PageElement['type']) => {
    // For existing sections, don't allow duplicates
    if (['hero', 'stats', 'brands', 'news'].includes(type)) {
      const exists = elements.find(el => el.type === type);
      if (exists) {
        toast.error(`Section ${type} đã tồn tại!`);
        return;
      }
    }

    const newElement = {
      type,
      content: getDefaultContent(type),
      styles: {},
      display_order: elements.length,
      title: getElementTitle(type)
    };
    
    createElementMutation.mutate(newElement);
  }, [elements, createElementMutation]);

  const updateElement = useCallback((id: string, updates: Partial<PageElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    toast("Đã cập nhật phần tử");
  }, []);

  const deleteElement = useCallback((id: string) => {
    const element = elements.find(el => el.id === id);
    if (element && ['hero', 'stats', 'brands', 'news'].includes(element.type)) {
      toast.error("Không thể xóa section mặc định!");
      return;
    }
    
    setElements(prev => prev.filter(el => el.id !== id));
    if (editingElement?.id === id) {
      setEditingElement(null);
    }
    toast("Đã xóa phần tử");
  }, [editingElement]);

  const saveLayout = useCallback(() => {
    // Update display order based on current order
    const updatedElements = elements.map((el, index) => ({
      ...el,
      display_order: index
    }));
    setElements(updatedElements);
    saveLayoutMutation.mutate(updatedElements);
  }, [elements, saveLayoutMutation]);

  const activeElement = elements.find(el => el.id === activeId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải layout trang chủ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quản lý trang chủ</h1>
              <p className="text-muted-foreground">Kéo thả để tùy chỉnh bố cục trang chủ</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={saveLayout}
                disabled={saveLayoutMutation.isPending}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saveLayoutMutation.isPending ? "Đang lưu..." : "Lưu Layout"}
              </Button>
              <Button
                variant={previewMode ? "default" : "outline"}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewMode ? "Chế độ chỉnh sửa" : "Xem trước"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbox */}
          {!previewMode && (
            <div className="lg:col-span-1">
              <ElementToolbox onAddElement={addElement} />
            </div>
          )}

          {/* Main Canvas */}
          <div className={previewMode ? "lg:col-span-4" : "lg:col-span-2"}>
            <Card className="min-h-[600px] p-4">
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={elements.map(el => el.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {elements.map((element) => (
                      <SortableItem
                        key={element.id}
                        element={element}
                        isPreview={previewMode}
                        onEdit={() => setEditingElement(element)}
                        onDelete={() => deleteElement(element.id)}
                      />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeElement && (
                    <div className="bg-card border-2 border-primary rounded-lg p-4 opacity-90">
                      <div className="text-sm font-medium">{activeElement.type}</div>
                    </div>
                  )}
                </DragOverlay>
              </DndContext>

              {elements.length === 0 && (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <LayoutGrid className="h-12 w-12 mx-auto mb-4" />
                    <p>Kéo thả các phần tử từ thanh công cụ để bắt đầu xây dựng trang</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Element Editor */}
          {!previewMode && (
            <div className="lg:col-span-1">
              {editingElement ? (
                <ElementEditor
                  element={editingElement}
                  onUpdate={(updates) => updateElement(editingElement.id, updates)}
                  onClose={() => setEditingElement(null)}
                />
              ) : (
                <Card className="p-4">
                  <div className="text-center text-muted-foreground">
                    <Edit2 className="h-8 w-8 mx-auto mb-2" />
                    <p>Chọn một phần tử để chỉnh sửa</p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageBuilder;