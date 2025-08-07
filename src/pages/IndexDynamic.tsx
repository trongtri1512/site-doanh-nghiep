import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import { Link } from "react-router-dom";
import { Star, Shield, Users, Mail, ArrowRight, MessageSquare } from "lucide-react";

const IndexDynamic = () => {
  // Fetch homepage layout from database
  const { data: layouts = [], isLoading } = useQuery({
    queryKey: ['homepage-layouts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_layouts')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch brands for brands section
  const { data: brands = [] } = useQuery({
    queryKey: ['brands-homepage'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const renderSection = (layout: any) => {
    const content = layout.content;
    
    switch (layout.section_type) {
      case 'hero':
        return (
          <section key={layout.id} className="relative min-h-[600px] overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={content.background_image || "/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png"}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
            <div className="container mx-auto px-6 py-20 relative z-10">
              <div className="max-w-2xl">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                    <span className="inline-block bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                      {content.title || "CHÀO MỪNG BẠN ĐẾN VỚI IMV VIETNAM"}
                    </span>
                  </h1>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    {content.subtitle || "Nâng tầm cuộc sống, vững vàng tương lai"}
                  </p>
                  {content.cta_text && (
                    <Link to={content.cta_link || "#"}>
                      <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-lg">
                        {content.cta_text}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'stats':
        return (
          <section key={layout.id} className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-1 bg-primary text-white p-8 rounded-lg text-center flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2">Chúng tôi là IMV Việt Nam</h3>
                </div>
                {(content.stats || []).map((stat: any, index: number) => (
                  <div key={index} className="bg-primary text-white p-6 rounded-lg">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                    {stat.unit && <div className="text-lg font-semibold mb-2">{stat.unit}</div>}
                    <div className="text-sm lg:text-base font-medium mb-3">{stat.description}</div>
                    {stat.note && (
                      <div className="text-xs opacity-80 leading-tight">{stat.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'brands':
        return (
          <section key={layout.id} className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Các nhãn hàng đồng hành"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {content.subtitle || "IMV tự hào là đối tác phân phối chính thức của nhiều thương hiệu uy tín hàng đầu thế giới"}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {brands.map((brand) => (
                  <Link 
                    key={brand.id}
                    to={`/brands/${brand.slug}`}
                    className="group bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                        <img 
                          src={brand.image_url || "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"}
                          alt={brand.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full mb-3">
                        {brand.category}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {brand.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              {content.cta_text && (
                <div className="text-center mt-12">
                  <Link 
                    to={content.cta_link || "/about"}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {content.cta_text}
                  </Link>
                </div>
              )}
            </div>
          </section>
        );

      case 'news':
        return <NewsSection key={layout.id} />;

      case 'gallery':
        return (
          <section key={layout.id} className="py-16 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Thư viện hình ảnh"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.images || []).map((image: any, index: number) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                          <p className="text-sm">{image.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section key={layout.id} className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Khách hàng nói gì về chúng tôi"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(content.testimonials || []).map((testimonial: any, index: number) => (
                  <div key={index} className="bg-card rounded-lg p-6 border border-border">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-8 h-8 text-primary mr-3" />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        {testimonial.company && (
                          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section 
            key={layout.id} 
            className="py-16"
            style={{ backgroundColor: content.background_color || '#1e40af' }}
          >
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.title || "Sẵn sàng bắt đầu?"}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {content.subtitle || "Liên hệ với chúng tôi ngay hôm nay"}
              </p>
              {content.cta_text && (
                <Link 
                  to={content.cta_link || "/contact"}
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  {content.cta_text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={layout.id} className="py-16 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Tính năng nổi bật"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(content.features || []).map((feature: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      {feature.icon === 'star' && <Star className="w-8 h-8 text-primary" />}
                      {feature.icon === 'shield' && <Shield className="w-8 h-8 text-primary" />}
                      {feature.icon === 'users' && <Users className="w-8 h-8 text-primary" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'team':
        return (
          <section key={layout.id} className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Đội ngũ của chúng tôi"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {(content.members || []).map((member: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={member.image || "/placeholder.svg"} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key={layout.id} className="py-16 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.title || "Liên hệ với chúng tôi"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Địa chỉ</h3>
                        <p className="text-muted-foreground">{content.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Điện thoại</h3>
                        <p className="text-muted-foreground">{content.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">{content.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {content.show_form && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="text-xl font-semibold mb-4">Gửi tin nhắn</h3>
                    <form className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Họ tên" 
                        className="w-full p-3 border border-border rounded-lg"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 border border-border rounded-lg"
                      />
                      <textarea 
                        placeholder="Tin nhắn" 
                        rows={4}
                        className="w-full p-3 border border-border rounded-lg"
                      ></textarea>
                      <button 
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Gửi tin nhắn
                      </button>
                    </form>
                  </div>
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải trang chủ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      {layouts.map(layout => renderSection(layout))}
      <Footer />
    </div>
  );
};

export default IndexDynamic;