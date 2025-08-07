import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from "@/components/admin/homepage-builder/SortableItem";
import { ElementToolbox } from "@/components/admin/homepage-builder/ElementToolbox";
import { BrandElementEditor } from "@/components/admin/homepage-builder/BrandElementEditor";
import { ArrowLeft, Save, Eye, X } from "lucide-react";

interface BrandPageElement {
  id: string;
  section_type: string;
  title?: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

const BrandPageBuilder = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const queryClient = useQueryClient();
  const [elements, setElements] = useState<BrandPageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<BrandPageElement | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", brandSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", brandSlug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch brand page elements
  const { data: brandElements, isLoading } = useQuery({
    queryKey: ["brand-pages", brand?.id],
    queryFn: async () => {
      if (!brand?.id) return [];
      
      const { data, error } = await supabase
        .from("brand_pages")
        .select("*")
        .eq("brand_id", brand.id)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!brand?.id,
  });

  useEffect(() => {
    if (brandElements) {
      setElements(brandElements);
    }
  }, [brandElements]);

  // Save layout mutation
  const saveLayoutMutation = useMutation({
    mutationFn: async (elementsToSave: BrandPageElement[]) => {
      if (!brand?.id) throw new Error("Brand not found");

      // Delete existing elements
      await supabase
        .from("brand_pages")
        .delete()
        .eq("brand_id", brand.id);

      // Insert new elements
      if (elementsToSave.length > 0) {
        const { error } = await supabase
          .from("brand_pages")
          .insert(
            elementsToSave.map((element, index) => ({
              brand_id: brand.id,
              section_type: element.section_type,
              title: element.title,
              content: element.content,
              styles: element.styles || {},
              display_order: index,
              is_active: element.is_active,
            }))
          );

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Layout đã được lưu thành công!");
      queryClient.invalidateQueries({ queryKey: ["brand-pages", brand?.id] });
    },
    onError: (error) => {
      console.error("Error saving layout:", error);
      toast.error("Có lỗi xảy ra khi lưu layout");
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addElement = (type: string) => {
    const newElement: BrandPageElement = {
      id: `element-${Date.now()}`,
      section_type: type,
      title: getDefaultTitle(type),
      content: getDefaultContent(type),
      styles: {},
      display_order: elements.length,
      is_active: true,
    };
    
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setIsEditorOpen(true);
  };

  const getDefaultTitle = (type: string) => {
    const titles: Record<string, string> = {
      hero: "Hero Section",
      about: "Về thương hiệu",
      products: "Sản phẩm nổi bật",
      features: "Tính năng đặc biệt",
      gallery: "Thư viện hình ảnh",
      testimonials: "Khách hàng đánh giá",
      cta: "Call to Action",
      contact: "Liên hệ",
    };
    return titles[type] || "New Section";
  };

  const getDefaultContent = (type: string) => {
    const defaultContents: Record<string, any> = {
      hero: {
        title: "Tiêu đề Hero",
        subtitle: "Mô tả ngắn về thương hiệu",
        background_image: "",
        cta_text: "Tìm hiểu thêm",
        cta_link: "#"
      },
      about: {
        title: "Về thương hiệu",
        description: "Mô tả chi tiết về thương hiệu...",
        image: ""
      },
      products: {
        title: "Sản phẩm nổi bật",
        products: []
      },
      features: {
        title: "Tính năng đặc biệt",
        features: []
      },
      gallery: {
        title: "Thư viện hình ảnh",
        images: []
      },
      testimonials: {
        title: "Khách hàng đánh giá",
        testimonials: []
      },
      cta: {
        title: "Liên hệ ngay hôm nay",
        description: "Để được tư vấn chi tiết",
        button_text: "Liên hệ",
        button_link: "/contact"
      },
      contact: {
        title: "Thông tin liên hệ",
        address: "",
        phone: "",
        email: ""
      }
    };
    return defaultContents[type] || {};
  };

  const updateElement = (updatedElement: BrandPageElement) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  };

  const deleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
      setIsEditorOpen(false);
    }
  };

  const saveLayout = () => {
    saveLayoutMutation.mutate(elements);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Không tìm thấy thương hiệu</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/brands" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
            Quay lại
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Quản lý trang {brand.name}</h1>
            <p className="text-muted-foreground">Tạo và chỉnh sửa layout cho trang thương hiệu</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/brands/${brand.slug}`} target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Xem trước
            </Link>
          </Button>
          <Button 
            onClick={saveLayout} 
            disabled={saveLayoutMutation.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {saveLayoutMutation.isPending ? "Đang lưu..." : "Lưu Layout"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <ElementToolbox onAddElement={addElement} />
        </div>

        <div className="col-span-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Layout trang</h3>
            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter} 
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={elements} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {elements.map((element) => (
                      <SortableItem
                        key={element.id}
                        element={{...element, type: element.section_type as any}}
                        onEdit={() => {
                          setSelectedElement(element);
                          setIsEditorOpen(true);
                        }}
                        onDelete={() => deleteElement(element.id)}
                      />
                  ))}
                  {elements.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Chưa có section nào được thêm</p>
                      <p className="text-sm mt-2">Kéo thả các section từ bên trái để bắt đầu</p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </Card>
        </div>

        <div className="col-span-3">
          {isEditorOpen && selectedElement && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Chỉnh sửa Section</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsEditorOpen(false);
                    setSelectedElement(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <BrandElementEditor
                element={selectedElement}
                onClose={() => {
                  setIsEditorOpen(false);
                  setSelectedElement(null);
                }}
                onUpdate={(updated) => {
                  const brandElement = {
                    ...selectedElement,
                    ...updated
                  };
                  updateElement(brandElement);
                }}
              />
            </Card>
          )}
          {!isEditorOpen && (
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                <p>Chọn một section để chỉnh sửa</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPageBuilder;