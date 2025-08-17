import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Microscope, Dna, Shield, Eye, Atom, Droplet, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BrandPageElement {
  id: string;
  section_type: string;
  section_key: string;
  title?: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
  language_code: string;
  brand_slug: string;
}

const AstaliftDynamic = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';
  const brandSlug = lang === 'en' ? 'astalift-en' : 'astalift';
  const [elements, setElements] = useState<BrandPageElement[]>([]);

  // Fetch brand page content from brand_page_content table
  const { data: brandElements, isLoading } = useQuery({
    queryKey: ["brand-page-content", brandSlug, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brand_page_content")
        .select("*")
        .eq("brand_slug", brandSlug)
        .eq("language_code", lang)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    if (brandElements) {
      setElements(brandElements);
    }
  }, [brandElements]);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      microscope: Microscope,
      dna: Dna,
      shield: Shield,
      eye: Eye,
      atom: Atom,
      droplet: Droplet,
      layers: Layers,
    };
    const IconComponent = icons[iconName] || Atom;
    return <IconComponent className="w-8 h-8" />;
  };

  const renderElement = (element: BrandPageElement) => {
    const content = element.content || {};
    const styles = element.styles || {};

    switch (element.section_type) {
      case "hero":
        return (
          <section 
            key={element.id} 
            className="relative min-h-screen flex items-center justify-center text-white"
            style={{
              background: styles.background || "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
              padding: styles.padding || "120px 0",
              textAlign: styles.textAlign || "center"
            }}
          >
            {content.background_image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${content.background_image})` }}
              />
            )}
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                {content.headline || element.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 animate-fade-in">
                {content.subheadline}
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto opacity-80 animate-fade-in">
                {content.description}
              </p>
              {content.cta_text && (
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg bg-white text-red-600 hover:bg-gray-100 animate-scale-in"
                  onClick={() => {
                    const element = document.querySelector(content.cta_link);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
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
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground animate-fade-in">
                  {content.title || element.title}
                </h2>
                <p className="text-xl md:text-2xl text-red-600 font-semibold mb-8 animate-fade-in">
                  {content.subtitle}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-4xl mx-auto animate-fade-in">
                  {content.content}
                </p>
                
                {content.highlights && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {content.highlights.map((highlight: any, index: number) => (
                      <div key={index} className="text-center hover-scale">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <div className="text-red-600">
                            {getIcon(highlight.icon)}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground">{highlight.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "features":
        return (
          <section 
            key={element.id} 
            className="py-20"
            style={{
              background: styles.background || "linear-gradient(135deg, hsl(0, 15%, 95%) 0%, hsl(0, 20%, 98%) 100%)"
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground animate-fade-in">
                    {content.title || element.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-red-600 font-semibold mb-8 animate-fade-in">
                    {content.subtitle}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-fade-in">
                    {content.description}
                  </p>
                </div>
                
                {content.features && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.features.map((feature: any, index: number) => (
                      <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-scale">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <div className="text-white">
                            {getIcon(feature.icon)}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground text-center">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed text-center mb-4">{feature.description}</p>
                        <div className="text-center">
                          <span className="inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                            {feature.benefit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "products":
        return (
          <section key={element.id} className="py-20 bg-background" id="products">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground animate-fade-in">
                    {content.title || element.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-red-600 font-semibold mb-8 animate-fade-in">
                    {content.subtitle}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-fade-in">
                    {content.description}
                  </p>
                </div>
                
                {content.products && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.products.map((product: any, index: number) => (
                      <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-scale">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-6">
                          <div className="mb-3">
                            <span className="inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                              {product.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-foreground">{product.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.description}</p>
                          <div className="border-t pt-4">
                            <p className="text-red-600 font-semibold text-sm">{product.keyBenefit}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section 
            key={element.id} 
            className="py-20 text-white"
            style={{
              background: styles.background || "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
              textAlign: styles.textAlign || "center"
            }}
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                {content.title || element.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in">
                {content.subtitle}
              </p>
              <p className="text-lg mb-8 opacity-80 max-w-4xl mx-auto animate-fade-in">
                {content.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {content.primaryCTA && (
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white text-red-600 hover:bg-gray-100 animate-scale-in"
                    onClick={() => window.location.href = content.primaryCTA.link}
                  >
                    {content.primaryCTA.text}
                  </Button>
                )}
                {content.secondaryCTA && (
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-red-600 animate-scale-in"
                    onClick={() => window.location.href = content.secondaryCTA.link}
                  >
                    {content.secondaryCTA.text}
                  </Button>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-lg text-muted-foreground">
            {lang === 'en' ? 'Loading...' : 'Đang tải...'}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
            <ArrowLeft size={20} />
            {lang === 'en' ? 'Back to home' : 'Quay lại trang chủ'}
          </Link>
        </div>
        
        <div className="w-full">
          {elements.length > 0 ? (
            elements.map(renderElement)
          ) : (
            // Fallback content if no dynamic content is available
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                {lang === 'en' ? 'ASTALIFT' : 'ASTALIFT'}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {lang === 'en' 
                  ? 'Premium skincare brand developed by Fujifilm Japan'
                  : 'Thương hiệu mỹ phẩm cao cấp được phát triển bởi Fujifilm Nhật Bản'
                }
              </p>
              <p className="text-muted-foreground">
                {lang === 'en' 
                  ? 'Content is being updated from admin.'
                  : 'Nội dung đang được cập nhật từ admin.'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AstaliftDynamic;