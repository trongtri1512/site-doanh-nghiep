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
            className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(25, 75%, 55%) 0%, hsl(15, 85%, 65%) 50%, hsl(340, 70%, 75%) 100%)",
              padding: styles.padding || "120px 0",
              textAlign: styles.textAlign || "center"
            }}
          >
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-96 h-96 rounded-full bg-white/10 -top-48 -left-48 animate-pulse"></div>
              <div className="absolute w-64 h-64 rounded-full bg-white/5 top-1/4 right-0 animate-bounce" style={{animationDuration: '3s'}}></div>
              <div className="absolute w-32 h-32 rounded-full bg-white/15 bottom-20 left-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {content.background_image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${content.background_image})` }}
              />
            )}
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-rose-100">
                {content.headline || element.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 animate-fade-in drop-shadow-lg">
                {content.subheadline}
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto opacity-80 animate-fade-in drop-shadow-md">
                {content.description}
              </p>
              {content.cta_text && (
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500 animate-scale-in shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
          <section key={element.id} className="py-20 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-rose-50/50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-200/20 to-orange-200/20 -top-48 -right-48 blur-3xl"></div>
              <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-rose-200/20 to-pink-200/20 bottom-0 -left-32 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700">
                  {content.title || element.title}
                </h2>
                <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8 animate-fade-in drop-shadow-sm">
                  {content.subtitle}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto animate-fade-in">
                  {content.content}
                </p>
                
                {content.highlights && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {content.highlights.map((highlight: any, index: number) => (
                      <div key={index} className="text-center hover-scale group">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-amber-200/50">
                          <div className="text-gradient-to-r from-amber-600 to-orange-600">
                            {getIcon(highlight.icon)}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">{highlight.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
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
            className="py-20 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(45, 80%, 95%) 0%, hsl(35, 70%, 97%) 50%, hsl(340, 60%, 98%) 100%)"
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, hsl(25, 70%, 90%) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 20%, hsl(340, 60%, 90%) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 40%, hsl(45, 80%, 90%) 0%, transparent 50%)`
              }}></div>
            </div>
            
            <div className="container mx-auto px-4 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700">
                    {content.title || element.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8 animate-fade-in drop-shadow-sm">
                    {content.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                    {content.description}
                  </p>
                </div>
                
                {content.features && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.features.map((feature: any, index: number) => (
                      <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover-scale border border-amber-100/50 hover:shadow-2xl transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <div className="text-white">
                            {getIcon(feature.icon)}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">{feature.description}</p>
                        <div className="text-center">
                          <span className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium border border-amber-200">
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
          <section key={element.id} className="py-20 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 relative overflow-hidden" id="products">
            {/* Decorative background */}
            <div className="absolute inset-0">
              <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-amber-300/10 to-orange-300/10 top-20 right-20 blur-3xl animate-pulse"></div>
              <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-rose-300/10 to-pink-300/10 bottom-20 left-20 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="container mx-auto px-4 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700">
                    {content.title || element.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8 animate-fade-in drop-shadow-sm">
                    {content.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                    {content.description}
                  </p>
                </div>
                
                {content.products && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.products.map((product: any, index: number) => (
                      <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover-scale border border-amber-100/50 hover:shadow-2xl transition-all duration-300 group">
                        {product.image && (
                          <div className="overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-3">
                            <span className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium border border-amber-200">
                              {product.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                          <div className="border-t border-amber-100 pt-4">
                            <p className="text-amber-600 font-semibold text-sm">{product.keyBenefit}</p>
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
            className="py-20 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(25, 75%, 55%) 0%, hsl(15, 85%, 65%) 50%, hsl(340, 70%, 75%) 100%)",
              textAlign: styles.textAlign || "center"
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 rounded-full bg-white/10 -top-48 -left-48 animate-pulse"></div>
              <div className="absolute w-80 h-80 rounded-full bg-white/5 top-1/3 right-0 animate-bounce" style={{animationDuration: '4s'}}></div>
              <div className="absolute w-40 h-40 rounded-full bg-white/15 bottom-20 left-1/3 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-rose-100">
                {content.title || element.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
                {content.subtitle}
              </p>
              <p className="text-lg mb-8 opacity-80 max-w-4xl mx-auto animate-fade-in drop-shadow-md">
                {content.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {content.primaryCTA && (
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white text-amber-700 hover:bg-amber-50 animate-scale-in shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-200"
                    onClick={() => window.location.href = content.primaryCTA.link}
                  >
                    {content.primaryCTA.text}
                  </Button>
                )}
                {content.secondaryCTA && (
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="px-8 py-4 text-lg border-white text-white hover:bg-white/10 backdrop-blur-sm animate-scale-in shadow-lg hover:shadow-xl transition-all duration-300"
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
          <Link to="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors font-medium">
            <ArrowLeft size={20} />
            {lang === 'en' ? 'Back to home' : 'Quay lại trang chủ'}
          </Link>
        </div>
        
        <div className="w-full">
          {elements.length > 0 ? (
            elements.map(renderElement)
          ) : (
            // Fallback content if no dynamic content is available
            <div className="container mx-auto px-4 py-20 text-center bg-gradient-to-br from-amber-50 to-orange-50 min-h-[60vh] flex items-center">
              <div className="w-full">
                <h1 className="text-4xl font-bold text-amber-700 mb-4">
                  {lang === 'en' ? 'ASTALIFT' : 'ASTALIFT'}
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  {lang === 'en' 
                    ? 'Premium skincare brand developed by Fujifilm Japan'
                    : 'Thương hiệu mỹ phẩm cao cấp được phát triển bởi Fujifilm Nhật Bản'
                  }
                </p>
                <p className="text-gray-600">
                  {lang === 'en' 
                    ? 'Content is being updated from admin.'
                    : 'Nội dung đang được cập nhật từ admin.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AstaliftDynamic;