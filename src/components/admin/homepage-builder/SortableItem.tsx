import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Grip, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Type, 
  BarChart3, 
  Sparkles,
  Award,
  Newspaper,
  Layout
} from "lucide-react";
import { PageElement } from "@/pages/admin/HomepageBuilder";

interface SortableItemProps {
  element: PageElement;
  isPreview?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function SortableItem({ element, isPreview, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getElementIcon = () => {
    switch (element.type) {
      case "text": return <Type className="h-4 w-4" />;
      case "image": return <ImageIcon className="h-4 w-4" />;
      case "hero": return <Sparkles className="h-4 w-4" />;
      case "stats": return <BarChart3 className="h-4 w-4" />;
      case "brands": return <Award className="h-4 w-4" />;
      case "news": return <Newspaper className="h-4 w-4" />;
      case "layout": return <Layout className="h-4 w-4" />;
      default: return <Type className="h-4 w-4" />;
    }
  };

  const renderElementContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="p-4">
            <p className="text-sm">{element.content.text || "Text content"}</p>
          </div>
        );
      
      case "image":
        return (
          <div className="p-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{element.content.alt || "Image"}</p>
          </div>
        );
      
      case "hero":
        return (
          <div className="relative p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{element.content.title || "Hero Title"}</h2>
            <p className="text-muted-foreground mb-4">{element.content.subtitle || "Hero Subtitle"}</p>
            <Button variant="outline" size="sm">{element.content.cta_text || element.content.cta || "CTA"}</Button>
          </div>
        );
      
      case "stats":
        return (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {element.content.stats?.slice(0, 4).map((stat: any, index: number) => (
                <div key={index} className="text-center p-3 bg-primary text-primary-foreground rounded-lg">
                  <div className="text-lg font-bold">{stat.number}</div>
                  {stat.unit && <div className="text-sm">{stat.unit}</div>}
                  <div className="text-xs opacity-90">{stat.description}</div>
                </div>
              )) || element.content.items?.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "brands":
        return (
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">{element.content.title || "Brands Section"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{element.content.subtitle || "Brand showcase"}</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-white rounded border flex items-center justify-center">
                  <Award className="h-6 w-6 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        );

      case "news":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">{element.content.title || "News Section"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{element.content.subtitle || "Latest news"}</p>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 p-2 bg-muted/50 rounded">
                  <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Sample News {i}</div>
                    <div className="text-xs text-muted-foreground">News excerpt...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "layout":
        return (
          <div className="p-4">
            <div className={`grid grid-cols-${element.content.columns || 2} gap-4`}>
              {Array.from({ length: element.content.columns || 2 }).map((_, index) => (
                <div key={index} className="h-20 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Cột {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Unknown element type</p>
          </div>
        );
    }
  };

  if (isPreview) {
    return (
      <div ref={setNodeRef} style={style}>
        {renderElementContent()}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="border-2 border-transparent hover:border-primary/50 transition-colors">
        {/* Element Header */}
        <div className="flex items-center justify-between p-2 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <button
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
              {...attributes}
              {...listeners}
            >
              <Grip className="h-4 w-4 text-muted-foreground" />
            </button>
            {getElementIcon()}
            <span className="text-sm font-medium capitalize">{element.type}</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Element Content */}
        {renderElementContent()}
      </Card>
    </div>
  );
}