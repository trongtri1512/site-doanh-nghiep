import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BrandPageElement {
  id: string;
  section_type: string;
  title?: string;
  content?: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

const BrandDynamicRouter = () => {
  const { slug } = useParams();
  const [elements, setElements] = useState<BrandPageElement[]>([]);

  // Fetch brand data by slug
  const { data: brand, isLoading: brandLoading } = useQuery({
    queryKey: ["brand", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  // Fetch brand page elements
  const { data: brandElements, isLoading: elementsLoading } = useQuery({
    queryKey: ["brand-pages", brand?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brand_pages")
        .select("*")
        .eq("brand_id", brand?.id)
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      return data;
    },
    enabled: !!brand?.id
  });

  useEffect(() => {
    if (brandElements) {
      setElements(brandElements);
    }
  }, [brandElements]);

  const renderElement = (element: BrandPageElement) => {
    const content = element.content || {};
    const styles = element.styles || {};

    switch (element.section_type) {
      case "hero":
        return (
          <section key={element.id} className="relative h-screen bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                {content.title || brand?.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
                {content.subtitle || brand?.description}
              </p>
              {content.cta_text && (
                <Button size="lg" className="px-8 py-4 text-lg">
                  {content.cta_text}
                </Button>
              )}
            </div>
          </section>
        );

      case "about":
        return (
          <section key={element.id} className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8 text-foreground">
                  {content.title || "About Us"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.description || "Learn more about our brand and mission."}
                </p>
              </div>
            </div>
          </section>
        );

      case "products":
        return (
          <section key={element.id} className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
                {content.title || "Our Products"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(content.products || []).map((product: any, index: number) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-lg">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">{product.name}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "features":
        return (
          <section key={element.id} className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
                {content.title || "Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(content.features || []).map((feature: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{feature.icon || "✨"}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "gallery":
        return (
          <section key={element.id} className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
                {content.title || "Gallery"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.images || []).map((image: string, index: number) => (
                  <div key={index} className="aspect-square bg-card rounded-lg overflow-hidden shadow-lg">
                    <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key={element.id} className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">
                {content.title || "Ready to Get Started?"}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {content.description || "Join thousands of satisfied customers today."}
              </p>
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                {content.cta_text || "Get Started"}
              </Button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  if (brandLoading || elementsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-lg text-muted-foreground">Đang tải...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy thương hiệu</h1>
          <p className="text-muted-foreground mb-6">Thương hiệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => window.history.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => window.history.back()} 
            variant="ghost" 
            className="mb-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Về trang chủ
          </Button>
        </div>

        {elements.length > 0 ? (
          elements.map(renderElement)
        ) : (
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6 text-foreground">{brand.name}</h1>
              <p className="text-xl text-muted-foreground mb-8">{brand.description}</p>
              {brand.image_url && (
                <div className="max-w-2xl mx-auto">
                  <img 
                    src={brand.image_url} 
                    alt={brand.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrandDynamicRouter;