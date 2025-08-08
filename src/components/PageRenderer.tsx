import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface PageElement {
  id: string;
  section_type: string;
  title: string;
  content: any;
  styles: any;
  display_order: number;
  is_active: boolean;
}

interface PageRendererProps {
  pageType: "homepage" | "about" | "careers" | "contact" | "news";
  language?: string;
  className?: string;
}

export function PageRenderer({ pageType, language = "vi", className = "" }: PageRendererProps) {
  const { data: elements = [], isLoading, error } = useQuery({
    queryKey: ['page-render', pageType, language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_layouts')
        .select('*')
        .eq('page_type', pageType)
        .eq('language_code', language)
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as PageElement[];
    }
  });

  const renderElement = (element: PageElement) => {
    const styles = {
      margin: element.styles?.margin,
      padding: element.styles?.padding,
      backgroundColor: element.styles?.backgroundColor,
      ...element.styles
    };

    switch (element.section_type) {
      case "hero":
        return (
          <section 
            key={element.id}
            className="relative py-20"
            style={styles}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: element.content?.backgroundImage ? `url(${element.content.backgroundImage})` : undefined
              }}
            >
              {element.content?.backgroundImage && (
                <div className="absolute inset-0 bg-foreground/50" />
              )}
            </div>
            <div className="relative z-10 container mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
                {element.content?.title || "Hero Title"}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                {element.content?.subtitle || "Hero subtitle"}
              </p>
              {element.content?.buttonText && (
                <a
                  href={element.content?.buttonUrl || "#"}
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {element.content.buttonText}
                </a>
              )}
            </div>
          </section>
        );

      case "text":
        return (
          <section key={element.id} className="py-12" style={styles}>
            <div className="container mx-auto">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: element.content?.text?.replace(/\n/g, '<br>') || "" 
                }}
              />
            </div>
          </section>
        );

      case "about":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {element.content?.title || "About Us"}
                  </h2>
                  <div 
                    className="prose prose-lg text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: element.content?.content?.replace(/\n/g, '<br>') || "" 
                    }}
                  />
                </div>
                {element.content?.image && (
                  <div>
                    <img 
                      src={element.content.image} 
                      alt="About Us" 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "contact":
        return (
          <section key={element.id} className="py-16 bg-muted/30" style={styles}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {element.content?.title || "Contact Us"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {element.content?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-muted-foreground">{element.content.address}</p>
                    </div>
                  </div>
                )}
                {element.content?.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      📞
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Điện thoại</h3>
                      <p className="text-muted-foreground">{element.content.phone}</p>
                    </div>
                  </div>
                )}
                {element.content?.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">{element.content.email}</p>
                    </div>
                  </div>
                )}
                {element.content?.workingHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      🕒
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                      <p className="text-muted-foreground">{element.content.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "faq":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {element.content?.title || "FAQ"}
              </h2>
              <div className="space-y-6">
                {(element.content?.items || []).map((item: any, index: number) => (
                  <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-3">{item.question}</h3>
                    <div 
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ 
                        __html: item.answer?.replace(/\n/g, '<br>') || "" 
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "video":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {element.content?.title || "Video"}
              </h2>
              {element.content?.description && (
                <p className="text-lg text-muted-foreground mb-8">
                  {element.content.description}
                </p>
              )}
              {element.content?.url && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={element.content.url}
                    className="w-full h-full"
                    allowFullScreen
                    title={element.content?.title || "Video"}
                  />
                </div>
              )}
            </div>
          </section>
        );

      case "services":
        return (
          <section key={element.id} className="py-16 bg-muted/30" style={styles}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {element.content?.title || "Services"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(element.content?.items || []).map((item: any, index: number) => (
                  <div key={index} className="bg-card rounded-lg p-6 shadow-sm text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{item.icon === 'star' ? '⭐' : '🎯'}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "vision_mission":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <article className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-bold mb-2">{element.content?.visionTitle || "Tầm nhìn"}</h3>
                  <p className="text-muted-foreground">{element.content?.visionText}</p>
                </article>
                <article className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-bold mb-2">{element.content?.missionTitle || "Sứ mệnh"}</h3>
                  <p className="text-muted-foreground">{element.content?.missionText}</p>
                </article>
              </div>
            </div>
          </section>
        );

      case "core_values":
        return (
          <section key={element.id} className="py-16 bg-muted/30" style={styles}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{element.title || "Giá trị cốt lõi"}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(element.content?.items || []).map((item: any, index: number) => (
                  <article key={index} className="bg-card rounded-lg p-6 shadow-sm text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">✨</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      case "business_sectors":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{element.title || "Các lĩnh vực kinh doanh"}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(element.content?.items || []).map((item: any, index: number) => (
                  <a key={index} href={item.url || '#'} className="group block rounded-lg overflow-hidden shadow-sm bg-card">
                    {item.image ? (
                      <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                    ) : (
                      <div className="aspect-[4/3] w-full bg-muted" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key={element.id} className="py-16" style={styles}>
            <div className="container mx-auto">
              <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{element.content?.title || "Kết nối cùng chúng tôi"}</h2>
                {element.content?.description && (
                  <p className="mb-6 opacity-90">{element.content.description}</p>
                )}
                {element.content?.buttonText && (
                  <a href={element.content?.buttonUrl || '/contact'} className="inline-block bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold">
                    {element.content.buttonText}
                  </a>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section key={element.id} className="py-8 px-4" style={styles}>
            <div className="max-w-4xl mx-auto text-center text-muted-foreground">
              <p>Section type "{element.section_type}" is not supported yet.</p>
            </div>
          </section>
        );
    }
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-32 w-full mb-8" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">Error loading page content.</p>
      </div>
    );
  }

  if (elements.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No content available for this page.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {elements.map(renderElement)}
    </div>
  );
}