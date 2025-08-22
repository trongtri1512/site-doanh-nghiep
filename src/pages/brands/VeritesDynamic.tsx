import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Heart, Sparkles, Star, Globe, Flower, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import veritesLogo from "@/assets/logos/verites-logo-new.png";
import veritesHero from "@/assets/verites-hero-new.jpg";
import veritesCollection from "@/assets/verites-collection-new.jpg";
import veritesCraftsmanship from "@/assets/verites-craftsmanship.jpg";

const VeritesDynamic = () => {
  const location = useLocation();
  const isEnglish = location.pathname.includes('/en/') || location.pathname.includes('-en');
  
  const content = {
    vi: {
      hero: {
        tagline: "The truth of scent",
        title: "Verites",
        subtitle: "Không tạo ra nước hoa để bạn trở thành một ai khác. Chúng tôi tạo nên mùi hương để mỗi người trở về với chính mình – nguyên bản, đầy cảm xúc và không cần phải giống bất kỳ ai.",
        description: "Mỗi lọ nước hoa là một lát cắt của ký ức, một nốt chạm của cảm xúc, một mảnh chân lý được cất giữ trong làn hương. Không khoa trương. Không khuôn mẫu. Không ép bạn phải cảm gì - chỉ lặng lẽ mở cánh cửa, để bạn quay về với cảm xúc thật bên trong mình.",
        cta: "Khám phá bộ sưu tập"
      },
      brandStory: {
        title: "Câu chuyện thương hiệu",
        content: "Verites không tạo ra nước hoa để bạn trở thành một ai khác. Chúng tôi tạo nên mùi hương để mỗi người trở về với chính mình - nguyên bản, đầy cảm xúc và không cần phải giống bất kỳ ai.",
        philosophy: "Mùi hương chạm vào tiềm thức nơi lưu giữ những điều ta không dám nói ra. Verites tin rằng mỗi người đều có một mùi hương riêng, một dấu ấn cảm xúc độc đáo chỉ thuộc về họ."
      },
      features: {
        title: "Triết lý thương hiệu",
        items: [
          {
            icon: "✨",
            title: "Chân thực",
            description: "Mùi hương phản ánh con người thật của bạn, không che giấu, không giả tạo."
          },
          {
            icon: "🌸",
            title: "Cảm xúc",
            description: "Mỗi hương thơm là một cảm xúc, một ký ức được lưu giữ trong từng nốt hương."
          },
          {
            icon: "💎",
            title: "Độc đáo",
            description: "Không theo khuôn mẫu, mỗi sản phẩm là một tác phẩm nghệ thuật riêng biệt."
          }
        ]
      },
      products: {
        title: "Bộ sưu tập",
        subtitle: "Khám phá những mùi hương đặc biệt",
        items: [
          {
            name: "Eau de Parfum Collection",
            description: "Bộ sưu tập nước hoa cao cấp với độ lưu hương lâu dài",
            image: veritesCollection
          },
          {
            name: "Limited Edition",
            description: "Phiên bản giới hạn với những mùi hương độc đáo",
            image: veritesCollection
          },
          {
            name: "Signature Scents",
            description: "Những mùi hương đặc trưng của thương hiệu",
            image: veritesCollection
          }
        ]
      },
      philosophy: {
        title: "Triết lý sản phẩm",
        content: "Chúng tôi không chỉ tạo ra nước hoa, mà tạo ra những trải nghiệm cảm xúc. Mỗi chai nước hoa Verites là một hành trình khám phá bản thân, nơi mùi hương trở thành ngôn ngữ của tâm hồn.",
        values: [
          "Chất lượng cao cấp từ nguyên liệu tự nhiên",
          "Nghệ thuật pha chế tinh tế",
          "Thiết kế chai sang trọng và tinh tế",
          "Trải nghiệm khách hàng độc đáo"
        ]
      },
      cta: {
        title: "Tìm hiểu thêm về Verites",
        description: "Khám phá thế giới nước hoa đầy cảm xúc và chân thực",
        button: "Liên hệ ngay"
      },
      backHome: "Quay lại trang chủ"
    },
    en: {
      hero: {
        tagline: "The truth of scent",
        title: "Verites",
        subtitle: "We don't create perfumes to make you someone else. We create fragrances for each person to return to themselves – authentic, emotional, and without needing to be like anyone else.",
        description: "Each bottle of perfume is a slice of memory, a touch of emotion, a piece of truth preserved in fragrance. No pretension. No templates. No forcing you to feel anything - just quietly opening the door for you to return to your true emotions within.",
        cta: "Explore Collection"
      },
      brandStory: {
        title: "Brand Story",
        content: "Verites doesn't create perfumes to make you someone else. We create fragrances for each person to return to themselves - authentic, emotional, and without needing to be like anyone else.",
        philosophy: "Fragrance touches the subconscious where we keep things we dare not say aloud. Verites believes that everyone has their own unique scent, a distinctive emotional imprint that belongs only to them."
      },
      features: {
        title: "Brand Philosophy",
        items: [
          {
            icon: "✨",
            title: "Authenticity",
            description: "Fragrances that reflect your true self, without hiding or pretending."
          },
          {
            icon: "🌸",
            title: "Emotion",
            description: "Each fragrance is an emotion, a memory preserved in every note."
          },
          {
            icon: "💎",
            title: "Uniqueness",
            description: "Not following templates, each product is a unique work of art."
          }
        ]
      },
      products: {
        title: "Collection",
        subtitle: "Discover extraordinary fragrances",
        items: [
          {
            name: "Eau de Parfum Collection",
            description: "Premium perfume collection with long-lasting fragrance",
            image: veritesCollection
          },
          {
            name: "Limited Edition",
            description: "Limited edition with unique fragrances",
            image: veritesCollection
          },
          {
            name: "Signature Scents",
            description: "Distinctive fragrances of the brand",
            image: veritesCollection
          }
        ]
      },
      philosophy: {
        title: "Product Philosophy",
        content: "We don't just create perfumes, but create emotional experiences. Each bottle of Verites perfume is a journey of self-discovery, where fragrance becomes the language of the soul.",
        values: [
          "Premium quality from natural ingredients",
          "Refined blending artistry",
          "Elegant and sophisticated bottle design",
          "Unique customer experience"
        ]
      },
      cta: {
        title: "Learn more about Verites",
        description: "Discover the world of emotional and authentic perfumes",
        button: "Contact Now"
      },
      backHome: "Back to Homepage"
    }
  };

  const currentContent = isEnglish ? content.en : content.vi;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={veritesHero} 
              alt="Verites Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-orange-900/30"></div>
          </div>
          
          <div className="relative container mx-auto px-6 py-20 min-h-screen flex items-center">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white space-y-8">
                  <div className="mb-8">
                    <img 
                      src={veritesLogo} 
                      alt="Verites Logo" 
                      className="h-20 filter drop-shadow-lg"
                    />
                  </div>
                  
                  <p className="text-2xl md:text-3xl font-light opacity-90 italic tracking-wide">
                    {currentContent.hero.tagline}
                  </p>
                  
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                    {currentContent.hero.title}
                  </h1>
                </div>
                
                {/* Right Content Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    {currentContent.hero.subtitle}
                  </p>
                  
                  <p className="text-white/80 text-base leading-relaxed mb-8">
                    {currentContent.hero.description}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Sparkles className="w-5 h-5" />
                    {currentContent.hero.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20 fill-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,120 Q300,20 600,60 T1200,40 L1200,120 Z" />
            </svg>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 bg-gradient-to-b from-background to-amber-50/30 dark:to-amber-950/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                    {currentContent.brandStory.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentContent.brandStory.content}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-amber-500 pl-6">
                    {currentContent.brandStory.philosophy}
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src={veritesCraftsmanship} 
                    alt="Verites Craftsmanship" 
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent rounded-2xl"></div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Droplets className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-amber-50/50 dark:bg-amber-950/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16">
                {currentContent.features.title}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {currentContent.features.items.map((feature, index) => (
                  <div key={index} className="bg-white/70 dark:bg-background/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="text-4xl mb-6">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-gradient-to-b from-background to-amber-50/30 dark:to-amber-950/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {currentContent.products.title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {currentContent.products.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {currentContent.products.items.map((product, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{product.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Philosophy Section */}
        <section className="py-20 bg-amber-50/50 dark:bg-amber-950/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                {currentContent.philosophy.title}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
                {currentContent.philosophy.content}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {currentContent.philosophy.values.map((value, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-background/50 rounded-lg">
                    <Star className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {currentContent.cta.title}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {currentContent.cta.description}
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Heart className="w-5 h-5" />
              {currentContent.cta.button}
            </Link>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="container mx-auto px-6 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentContent.backHome}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VeritesDynamic;