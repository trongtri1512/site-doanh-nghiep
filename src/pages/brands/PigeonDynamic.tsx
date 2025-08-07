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

const PigeonDynamic = () => {
  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", "pigeon"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", "pigeon")
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
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!brand?.id,
  });

  const renderSection = (element: BrandPageElement) => {
    const { section_type, content, title } = element;

    switch (section_type) {
      case 'hero':
        return (
          <div key={element.id} className="relative h-96 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden">
            {content.background_image && (
              <img 
                src={content.background_image} 
                alt="Hero Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="relative z-10 h-full flex items-center justify-center text-center p-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold text-foreground mb-4">{content.title}</h1>
                <p className="text-xl text-muted-foreground mb-8">{content.subtitle}</p>
                {content.cta_text && content.cta_link && (
                  <Link 
                    to={content.cta_link}
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {content.cta_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div key={element.id} className="grid md:grid-cols-2 gap-8 py-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
              <p className="text-muted-foreground leading-relaxed">{content.description}</p>
            </div>
            {content.image && (
              <div>
                <img 
                  src={content.image} 
                  alt={title} 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        );

      case 'products':
        return (
          <div key={element.id} className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.products?.map((product: any, index: number) => (
                <div key={index} className="bg-accent/50 rounded-lg p-6">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div key={element.id} className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.features?.map((feature: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div key={element.id} className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{title}</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {content.images?.map((image: string, index: number) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div key={element.id} className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-accent/50 rounded-lg p-6">
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar && (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div key={element.id} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
            <p className="text-muted-foreground text-lg mb-6">{content.description}</p>
            {content.button_text && content.button_link && (
              <Link 
                to={content.button_link}
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {content.button_text}
              </Link>
            )}
          </div>
        );

      case 'contact':
        return (
          <div key={element.id} className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{title}</h2>
            <div className="max-w-md mx-auto bg-accent/50 rounded-lg p-6">
              {content.address && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Địa chỉ:</h3>
                  <p className="text-muted-foreground">{content.address}</p>
                </div>
              )}
              {content.phone && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Điện thoại:</h3>
                  <p className="text-muted-foreground">{content.phone}</p>
                </div>
              )}
              {content.email && (
                <div>
                  <h3 className="font-semibold mb-2">Email:</h3>
                  <p className="text-muted-foreground">{content.email}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Đang tải...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-500">Không tìm thấy thương hiệu</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {brandElements && brandElements.length > 0 ? (
            brandElements.map(renderSection)
          ) : (
            // Fallback to default content if no custom layout
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">{brand.name}</h1>
              <p className="text-xl text-muted-foreground mb-8">{brand.description}</p>
              {brand.image_url && (
                <img 
                  src={brand.image_url} 
                  alt={brand.name} 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PigeonDynamic;