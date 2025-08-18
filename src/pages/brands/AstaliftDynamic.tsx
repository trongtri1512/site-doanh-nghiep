import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  Microscope, 
  Dna, 
  Shield, 
  Eye, 
  Atom, 
  Droplet, 
  Layers,
  Star,
  Sparkles,
  Award,
  Globe,
  Users,
  Clock,
  ArrowRight,
  Play
} from "lucide-react";
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
  const currentPath = window.location.pathname;
  
  // Determine language from URL path instead of query params
  const lang = currentPath.includes('/en/') ? 'en' : 
               searchParams.get('lang') === 'en' ? 'en' : 'vi';
  
  const brandSlug = lang === 'en' ? 'astalift-en' : 'astalift';
  const [elements, setElements] = useState<BrandPageElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    patents: 0,
    countries: 0,
    products: 0
  });

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

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counters for Astalift statistics
    const targets = { years: 90, patents: 200, countries: 30, products: 150 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        years: Math.round(targets.years * progress),
        patents: Math.round(targets.patents * progress),
        countries: Math.round(targets.countries * progress),
        products: Math.round(targets.products * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      microscope: Microscope,
      dna: Dna,
      shield: Shield,
      eye: Eye,
      atom: Atom,
      droplet: Droplet,
      layers: Layers,
      star: Star,
      sparkles: Sparkles,
      award: Award,
      globe: Globe,
      users: Users,
      clock: Clock,
    };
    const IconComponent = icons[iconName] || Atom;
    return <IconComponent className="w-8 h-8" />;
  };

  // Timeline data based on Astalift's real history
  const timelineData = [
    { 
      year: "1934", 
      event: lang === 'en' ? "FUJIFILM founded" : "FUJIFILM thành lập",
      color: "from-red-500 to-pink-500"
    },
    { 
      year: "1968", 
      event: lang === 'en' ? "Hong Kong expansion" : "Mở rộng Hong Kong",
      color: "from-pink-500 to-rose-500"
    },
    { 
      year: "2007", 
      event: lang === 'en' ? "ASTALIFT born with nano Astaxanthin" : "ASTALIFT ra đời với Astaxanthin nano",
      color: "from-rose-500 to-amber-500"
    },
    { 
      year: "2010", 
      event: lang === 'en' ? "JELLY AQUARYSTA launched" : "Ra mắt JELLY AQUARYSTA",
      color: "from-amber-500 to-orange-500"
    },
    { 
      year: "2012", 
      event: lang === 'en' ? "D-UV Guard technology" : "Công nghệ D-UV Guard",
      color: "from-orange-500 to-red-500"
    },
    { 
      year: "2013", 
      event: lang === 'en' ? "ASTALIFT WHITE series" : "Dòng ASTALIFT WHITE",
      color: "from-red-500 to-pink-500"
    }
  ];

  // Core innovations based on FUJIFILM's technology
  const coreInnovations = [
    {
      icon: "microscope",
      title: lang === 'en' ? "Nano Technology" : "Công nghệ Nano",
      description: lang === 'en' 
        ? "Revolutionary nano-astaxanthin for deeper skin penetration" 
        : "Công nghệ nano-astaxanthin đột phá cho khả năng thấm sâu"
    },
    {
      icon: "layers",
      title: lang === 'en' ? "Photo Film Heritage" : "Di sản công nghệ phim ảnh",
      description: lang === 'en' 
        ? "90+ years of collagen research from film technology" 
        : "Hơn 90 năm nghiên cứu collagen từ công nghệ phim ảnh"
    },
    {
      icon: "shield",
      title: lang === 'en' ? "D-UV Guard" : "Bảo vệ D-UV",
      description: lang === 'en' 
        ? "Advanced protection against deep UV-A rays" 
        : "Bảo vệ tiên tiến chống tia UV-A sâu"
    },
    {
      icon: "sparkles",
      title: lang === 'en' ? "Astaxanthin Power" : "Sức mạnh Astaxanthin",
      description: lang === 'en' 
        ? "3x stronger antioxidant power than vitamin C" 
        : "Khả năng chống oxy hóa mạnh gấp 3 lần vitamin C"
    }
  ];

  const renderElement = (element: BrandPageElement) => {
    const content = element.content || {};
    const styles = element.styles || {};

    switch (element.section_type) {
      case "hero":
        return (
          <section 
            key={element.id} 
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Sophisticated gradient background inspired by Astalift's red heritage */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-rose-800 to-amber-700"></div>
            
            {/* Layered background effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
              <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 -top-64 -right-64 blur-3xl animate-pulse"></div>
              <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 -bottom-48 -left-48 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Floating geometric elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
              <div className="absolute top-40 right-32 w-3 h-3 bg-red-300/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-amber-300/50 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
            </div>
            
            {content.background_image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${content.background_image})` }}
              />
            )}
            
            <div className="container mx-auto px-4 text-center relative z-10 text-white">
              <div className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {/* Premium badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-glow border border-white/20">
                  <Star className="w-4 h-4" />
                  {lang === 'en' ? 'Photo Film Heritage Meets Skincare Innovation' : 'Di sản công nghệ phim ảnh gặp gỡ đổi mới chăm sóc da'}
                </div>
                
                {/* Main headline */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-red-100 to-amber-100 bg-clip-text text-transparent">
                    {content.headline || (lang === 'en' ? 'ASTALIFT' : 'ASTALIFT')}
                  </span>
                  <br />
                  <span className="text-white/90 text-3xl md:text-4xl font-light">
                    {lang === 'en' ? 'Tomorrow, More Beautiful Than Today' : 'Ngày mai đẹp hơn hôm nay'}
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                  {content.subheadline || (lang === 'en' 
                    ? '90+ years of FUJIFILM\'s photo technology expertise revolutionizing skincare with nano-astaxanthin innovation'
                    : 'Hơn 90 năm chuyên môn công nghệ ảnh của FUJIFILM cách mạng hóa chăm sóc da với đổi mới nano-astaxanthin'
                  )}
                </p>
                
                {/* Description */}
                <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                  {content.description || (lang === 'en'
                    ? 'From capturing beautiful moments to preserving beautiful skin - experience the power of Japanese innovation'
                    : 'Từ việc ghi lại những khoảnh khắc đẹp đến bảo vệ làn da đẹp - trải nghiệm sức mạnh của sự đổi mới Nhật Bản'
                  )}
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 group px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => {
                      const element = document.querySelector('#innovations');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    {content.cta_text || (lang === 'en' ? 'Discover Innovation' : 'Khám phá đổi mới')}
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      const element = document.querySelector('#products');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {lang === 'en' ? 'View Products' : 'Xem sản phẩm'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
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
          <Link 
            to={lang === 'en' ? "/en" : "/"} 
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            {lang === 'en' ? 'Back to home' : 'Quay lại trang chủ'}
          </Link>
        </div>
        
        <div className="w-full">
          {elements.length > 0 ? (
            elements.map(renderElement)
          ) : (
            <>
              {/* Hero Section with fallback content */}
              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-rose-800 to-amber-700"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
                    <Star className="w-4 h-4" />
                    {lang === 'en' ? 'Photo Film Heritage Meets Skincare Innovation' : 'Di sản công nghệ phim ảnh gặp gỡ đổi mới chăm sóc da'}
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-red-100 to-amber-100 bg-clip-text text-transparent">
                      ASTALIFT
                    </span>
                    <br />
                    <span className="text-white/90 text-3xl md:text-4xl font-light">
                      {lang === 'en' ? 'Tomorrow, More Beautiful Than Today' : 'Ngày mai đẹp hơn hôm nay'}
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
                    {lang === 'en' 
                      ? '90+ years of FUJIFILM\'s photo technology expertise revolutionizing skincare'
                      : 'Hơn 90 năm chuyên môn công nghệ ảnh của FUJIFILM cách mạng hóa chăm sóc da'
                    }
                  </p>
                  
                  <p className="text-gray-200/80 mb-8">
                    {lang === 'en' 
                      ? 'Content is being updated from admin.'
                      : 'Nội dung đang được cập nhật từ admin.'
                    }
                  </p>
                </div>
              </section>

              {/* Heritage Timeline */}
              <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50" id="heritage">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                      {lang === 'en' ? 'Heritage Timeline' : 'Dòng thời gian di sản'}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {lang === 'en' 
                        ? 'From photographic innovation to skincare revolution'
                        : 'Từ đổi mới nhiếp ảnh đến cách mạng chăm sóc da'
                      }
                    </p>
                  </div>
                  
                  <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {timelineData.map((item, index) => (
                        <div 
                          key={index}
                          className={`text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                            isVisible ? 'animate-reveal-up' : 'opacity-0'
                          }`}
                          style={{animationDelay: `${index * 200}ms`}}
                        >
                          <div className={`w-12 h-1 bg-gradient-to-r ${item.color} rounded-full mx-auto mb-4`}></div>
                          <div className="text-2xl font-bold text-red-600 mb-3">{item.year}</div>
                          <div className="text-sm text-gray-600 leading-relaxed">{item.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="py-16 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="animate-counter-up">
                      <div className="text-4xl md:text-6xl font-bold mb-2">{counters.years}+</div>
                      <div className="text-sm md:text-base opacity-90">
                        {lang === 'en' ? 'Years Innovation' : 'Năm đổi mới'}
                      </div>
                    </div>
                    <div className="animate-counter-up" style={{animationDelay: '0.2s'}}>
                      <div className="text-4xl md:text-6xl font-bold mb-2">{counters.patents}+</div>
                      <div className="text-sm md:text-base opacity-90">
                        {lang === 'en' ? 'Patents' : 'Bằng sáng chế'}
                      </div>
                    </div>
                    <div className="animate-counter-up" style={{animationDelay: '0.4s'}}>
                      <div className="text-4xl md:text-6xl font-bold mb-2">{counters.countries}+</div>
                      <div className="text-sm md:text-base opacity-90">
                        {lang === 'en' ? 'Countries' : 'Quốc gia'}
                      </div>
                    </div>
                    <div className="animate-counter-up" style={{animationDelay: '0.6s'}}>
                      <div className="text-4xl md:text-6xl font-bold mb-2">{counters.products}+</div>
                      <div className="text-sm md:text-base opacity-90">
                        {lang === 'en' ? 'Products' : 'Sản phẩm'}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Core Innovations */}
              <section className="py-20 bg-background" id="innovations">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                      {lang === 'en' ? 'Core Innovations' : 'Đổi mới cốt lõi'}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      {lang === 'en' 
                        ? 'Revolutionary technologies that bridge photography and skincare'
                        : 'Công nghệ cách mạng kết nối nhiếp ảnh và chăm sóc da'
                      }
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreInnovations.map((innovation, index) => (
                      <div 
                        key={index}
                        className={`group bg-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-border ${
                          isVisible ? 'animate-reveal-up' : 'opacity-0'
                        }`}
                        style={{animationDelay: `${index * 150}ms`}}
                      >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-amber-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          {getIcon(innovation.icon)}
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground">{innovation.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{innovation.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AstaliftDynamic;