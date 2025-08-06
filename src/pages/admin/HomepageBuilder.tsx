import { useState, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Grip, Edit2, Trash2, Image, Type, LayoutGrid } from "lucide-react";
import { SortableItem } from "@/components/admin/homepage-builder/SortableItem";
import { ElementToolbox } from "@/components/admin/homepage-builder/ElementToolbox";
import { ElementEditor } from "@/components/admin/homepage-builder/ElementEditor";
import { toast } from "sonner";

export interface PageElement {
  id: string;
  type: "text" | "image" | "layout" | "hero" | "stats";
  content: any;
  styles?: any;
}

const defaultElements: PageElement[] = [
  {
    id: "hero-1",
    type: "hero",
    content: {
      title: "Welcome to Our Company",
      subtitle: "We provide innovative solutions for your business",
      cta: "Learn More",
      backgroundImage: "/placeholder.svg"
    }
  },
  {
    id: "stats-1", 
    type: "stats",
    content: {
      items: [
        { label: "Years Experience", value: "25+" },
        { label: "Happy Clients", value: "1000+" },
        { label: "Projects Completed", value: "500+" },
        { label: "Awards Won", value: "50+" }
      ]
    }
  }
];

const HomepageBuilder = () => {
  const [elements, setElements] = useState<PageElement[]>(defaultElements);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<PageElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

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
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  }, []);

  const addElement = useCallback((type: PageElement['type']) => {
    const newElement: PageElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type)
    };
    
    setElements(prev => [...prev, newElement]);
    toast("Đã thêm phần tử mới");
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<PageElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    toast("Đã cập nhật phần tử");
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    toast("Đã xóa phần tử");
  }, []);

  const saveLayout = useCallback(() => {
    // TODO: Save to database
    console.log("Saving layout:", elements);
    toast("Đã lưu bố cục trang chủ");
  }, [elements]);

  function getDefaultContent(type: PageElement['type']) {
    switch (type) {
      case "text":
        return { text: "Nhập nội dung text của bạn ở đây..." };
      case "image":
        return { url: "/placeholder.svg", alt: "Image description" };
      case "layout":
        return { columns: 2, items: [] };
      case "hero":
        return {
          title: "Tiêu đề Hero",
          subtitle: "Mô tả ngắn gọn",
          cta: "Call to Action",
          backgroundImage: "/placeholder.svg"
        };
      case "stats":
        return {
          items: [
            { label: "Metric 1", value: "100+" },
            { label: "Metric 2", value: "200+" }
          ]
        };
      default:
        return {};
    }
  }

  const activeElement = elements.find(el => el.id === activeId);

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
                variant={previewMode ? "default" : "outline"}
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? "Chế độ chỉnh sửa" : "Xem trước"}
              </Button>
              <Button onClick={saveLayout}>
                Lưu thay đổi
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