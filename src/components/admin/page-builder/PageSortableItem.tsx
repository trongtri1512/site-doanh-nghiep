import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GripVertical, 
  Edit2, 
  Trash2, 
  Type, 
  Image, 
  Sparkles, 
  BarChart3,
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
  Camera
} from "lucide-react";
import { PageElement } from "./UniversalPageBuilder";

interface PageSortableItemProps {
  element: PageElement;
  isPreview?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function PageSortableItem({ element, isPreview = false, onEdit, onDelete }: PageSortableItemProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  const getElementIcon = () => {
    const iconMap = {
      text: <Type className="h-5 w-5" />,
      image: <Image className="h-5 w-5" />,
      hero: <Sparkles className="h-5 w-5" />,
      stats: <BarChart3 className="h-5 w-5" />,
      brands: <Award className="h-5 w-5" />,
      news: <Newspaper className="h-5 w-5" />,
      gallery: <Images className="h-5 w-5" />,
      testimonials: <MessageSquare className="h-5 w-5" />,
      cta: <ArrowRight className="h-5 w-5" />,
      features: <Star className="h-5 w-5" />,
      team: <Users className="h-5 w-5" />,
      contact: <Mail className="h-5 w-5" />,
      about: <Info className="h-5 w-5" />,
      form: <FileText className="h-5 w-5" />,
      map: <MapPin className="h-5 w-5" />,
      video: <Play className="h-5 w-5" />,
      faq: <HelpCircle className="h-5 w-5" />,
      services: <Briefcase className="h-5 w-5" />,
      portfolio: <Camera className="h-5 w-5" />,
      layout: <Award className="h-5 w-5" />
    };
    return iconMap[element.type] || <Type className="h-5 w-5" />;
  };

  const renderElementContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="p-4">
            <p className="text-sm text-muted-foreground truncate">
              {element.content?.text || "Nội dung văn bản"}
            </p>
          </div>
        );

      case "image":
        return (
          <div className="p-4">
            {element.content?.url ? (
              <img 
                src={element.content.url} 
                alt={element.content?.alt || "Image"} 
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <div className="w-full h-32 bg-muted rounded flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
        );

      case "hero":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-lg">{element.content?.title || "Hero Title"}</h3>
            <p className="text-sm text-muted-foreground">
              {element.content?.subtitle || "Hero subtitle"}
            </p>
            {element.content?.buttonText && (
              <Button size="sm" className="mt-2">
                {element.content.buttonText}
              </Button>
            )}
          </div>
        );

      case "about":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold">{element.content?.title || "About Title"}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {element.content?.content || "About content..."}
            </p>
          </div>
        );

      case "contact":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold">{element.content?.title || "Contact Info"}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {element.content?.address && <p>📍 {element.content.address}</p>}
              {element.content?.phone && <p>📞 {element.content.phone}</p>}
              {element.content?.email && <p>✉️ {element.content.email}</p>}
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold">{element.content?.title || "FAQ"}</h3>
            <div className="text-sm text-muted-foreground">
              {element.content?.items?.length || 0} câu hỏi
            </div>
          </div>
        );

      case "video":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold">{element.content?.title || "Video"}</h3>
            <div className="w-full h-24 bg-muted rounded flex items-center justify-center">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        );

      case "services":
        return (
          <div className="p-4 space-y-2">
            <h3 className="font-bold">{element.content?.title || "Services"}</h3>
            <div className="text-sm text-muted-foreground">
              {element.content?.items?.length || 0} dịch vụ
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              {element.type} - {element.title || "Untitled"}
            </p>
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
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="group hover:shadow-md transition-shadow"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div 
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-primary">{getElementIcon()}</div>
          <span className="text-sm font-medium">
            {element.title || element.type}
          </span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {renderElementContent()}
      </CardContent>
    </Card>
  );
}