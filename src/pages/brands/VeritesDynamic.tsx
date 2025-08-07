import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BrandPageElement {
  id: string;
  section_type: string;
  title?: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

const VeritesDynamic = () => {
  const [elements, setElements] = useState<BrandPageElement[]>([]);

  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", "verites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", "verites")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch brand page elements
  const { data: brandElements } = useQuery({
    queryKey: ["brand-pages", brand?.id],
    queryFn: async () => {
      if (!brand?.id) return [];
      
      const { data, error } = await supabase
        .from("brand_pages")
        .select("*")
        .eq("brand_id", brand.id)
        .eq("is_active", true)
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

  const renderElement = (element: BrandPageElement) => {
    switch (element.section_type) {
      case "hero":
        return (
          <div key={element.id} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {element.content?.title || brand?.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {element.content?.subtitle || brand?.description}
            </p>
            {element.content?.background_image && (
              <img 
                src={element.content.background_image} 
                alt={element.content?.title || brand?.name} 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        );

      case "about":
        return (
          <div key={element.id} className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-foreground">
              {element.title || "Về thương hiệu"}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: element.content?.description || "" }} />
            </div>
            {element.content?.image && (
              <img 
                src={element.content.image} 
                alt={element.title} 
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        );

      case "products":
        return (
          <div key={element.id} className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {element.title || "Sản phẩm"}
            </h3>
            <div className="bg-accent/50 rounded-lg p-6">
              {element.content?.products?.map((product: any, index: number) => (
                <div key={index} className="mb-3 text-muted-foreground">
                  <strong>{product.name}:</strong> {product.description}
                </div>
              ))}
            </div>
          </div>
        );

      case "features":
        return (
          <div key={element.id} className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {element.title || "Tính năng"}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {element.content?.features?.map((feature: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div key={element.id} className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {element.title || "Thư viện hình ảnh"}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {element.content?.images?.map((image: string, index: number) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        );

      case "cta":
        return (
          <div key={element.id} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {element.title || "Liên hệ"}
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              {element.content?.description}
            </p>
            {element.content?.button_text && (
              <Link 
                to={element.content?.button_link || "#"}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                {element.content.button_text}
              </Link>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-6xl mx-auto">
          {elements.length > 0 ? (
            elements.map(renderElement)
          ) : (
            // Fallback content if no dynamic content is available
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Verites Vietnam</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thương hiệu mỹ phẩm, đặc biệt là nước hoa và các sản phẩm chăm sóc cơ thể có hương thơm
              </p>
              <p className="text-muted-foreground">
                Nội dung đang được cập nhật từ admin.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VeritesDynamic;