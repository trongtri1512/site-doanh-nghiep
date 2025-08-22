import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ArrowLeft, Star, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import etsukoHeroBanner from "@/assets/etsuko-hero-banner.jpg";
import etsukoLogo from "@/assets/etsuko-logo-new.png";
import etsukoProducts from "@/assets/etsuko-products.jpg";
import etsukoCharacters from "@/assets/etsuko-characters.png";

interface BrandPageElement {
  id: string;
  section_type: string;
  title?: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

const EtsukoDynamic = () => {
  const [elements, setElements] = useState<BrandPageElement[]>([]);
  const { currentLanguage } = useLanguage();

  // Content for both languages
  const content = {
    vi: {
      backToHome: "Quay lại trang chủ",
      slogan: "Em bé hạnh phúc - Làn da khỏe mạnh",
      heroDescription: "Mỗi em bé sinh ra đều mang trong mình một thế giới riêng biệt – với cá tính, cảm xúc và nhịp điệu rất riêng. Etsuko ra đời để nâng niu sự khác biệt ấy – như một cái ôm dịu dàng, vừa bảo vệ làn da con mỗi ngày, vừa âm thầm tôn trọng con theo cách con muốn được là chính mình.",
      brandStory: "Câu chuyện thương hiệu",
      nameOrigin: "Ý nghĩa tên gọi \"Etsuko\"",
      nameDescription: "Lấy cảm hứng từ \"Etsuko\" – trong tiếng Nhật nghĩa là em bé hạnh phúc, chúng tôi tin rằng hạnh phúc không đến từ việc uốn mình theo chuẩn mực, mà từ việc được tự do thể hiện bản thân – dù là qua mùi hương con chọn mỗi sáng, hay sự thoải mái sau lần tắm cuối ngày.",
      fromHeart: "Từ trái tim yêu thương trẻ em",
      philosophy: "Triết lý thương hiệu",
      philosophyItems: [
        "Tôn trọng sự khác biệt của mỗi em bé",
        "Bảo vệ làn da mỏng manh một cách dịu dàng",
        "Mang lại niềm vui trong từng khoảnh khắc tắm gội"
      ],
      naturalIngredients: "Dưỡng chất thiên nhiên từ Nhật Bản",
      ingredientsDescription: "Etsuko mang đến công thức chăm sóc từ 9 loại thảo dược quý của Nhật Bản, cùng các thành phần cấp ẩm và phục hồi tự nhiên, tạo nên lớp màng dịu lành cho làn da mỏng manh của trẻ nhỏ.",
      featuredProducts: "SẢN PHẨM NỔI BẬT",
      products: [
        {
          name: "Hương Dưa Lưới Nhật",
          character: "Đại diện: Cáo Foxi",
          description: "Thanh mát, dịu ngọt. Mùi hương mát lạnh như buổi sớm mùa hè."
        },
        {
          name: "Táo Fuji Nhật",
          character: "Đại diện: Nhím Hedi",
          description: "Ngọt ngào, tươi mới. Hương thơm thanh mát như một vườn táo chín."
        },
        {
          name: "Yuzu Quýt Nhật",
          character: "Đại diện: Cú Owli",
          description: "Năng động, lanh lợi. Mùi hương chua nhẹ, the mát."
        },
        {
          name: "Mono Đào Nhật",
          character: "Đại diện: Cú Owli",
          description: "Điềm đạm, thông minh và yêu thích sự yên bình."
        }
      ],
      carePhilosophy: "Triết lý chăm sóc",
      careDescription: "Mỗi mùi hương là một sắc thái cảm xúc – là cách con nói lên điều mình thích, và tự chọn lấy thế giới mình thuộc về. Với Etsuko, mỗi lần tắm không chỉ là làm sạch – mà là một cách con kết nối với chính mình, theo cách tự nhiên và dịu dàng nhất.",
      ourCommitment: "Cam kết của chúng tôi",
      commitments: [
        { title: "An toàn tuyệt đối", description: "Kiểm tra chất lượng nghiêm ngặt" },
        { title: "Yêu thương chân thành", description: "Hiểu và tôn trọng từng em bé" },
        { title: "Chất lượng hàng đầu", description: "Thành phần thiên nhiên từ Nhật Bản" }
      ],
      ctaTitle: "Cùng Etsuko chăm sóc bé yêu",
      ctaDescription: "Để mỗi khoảnh khắc tắm gội trở thành niềm vui, mỗi làn da được bảo vệ dịu dàng, và mỗi em bé được tự do thể hiện bản thân theo cách riêng của mình.",
      contactConsult: "Liên hệ tư vấn",
      viewMoreProducts: "Xem thêm sản phẩm",
      featuresTitle: "Đặc điểm nổi bật",
      features: [
        "Độ pH cân bằng, nhẹ dịu như nước mắt",
        "Không chứa xà phòng mạnh",
        "Không gây cay mắt",
        "Phù hợp sử dụng hằng ngày"
      ]
    },
    en: {
      backToHome: "Back to Home",
      slogan: "Happy Baby - Healthy Skin",
      heroDescription: "Every baby is born with their own unique world – with distinct personality, emotions and rhythm. Etsuko was created to cherish that uniqueness – like a gentle embrace, protecting your child's skin every day, while quietly respecting their desire to be themselves.",
      brandStory: "Brand Story",
      nameOrigin: "Meaning of \"Etsuko\"",
      nameDescription: "Inspired by \"Etsuko\" – which means happy baby in Japanese, we believe that happiness doesn't come from conforming to standards, but from being free to express yourself – whether through the fragrance your child chooses each morning, or the comfort after the last bath of the day.",
      fromHeart: "From the heart of loving children",
      philosophy: "Brand Philosophy",
      philosophyItems: [
        "Respect the uniqueness of each baby",
        "Protect delicate skin gently",
        "Bring joy to every bath time moment"
      ],
      naturalIngredients: "Natural Ingredients from Japan",
      ingredientsDescription: "Etsuko brings a care formula from 9 precious Japanese herbs, along with natural moisturizing and restorative ingredients, creating a gentle protective layer for children's delicate skin.",
      featuredProducts: "FEATURED PRODUCTS",
      products: [
        {
          name: "Japanese Melon Fragrance",
          character: "Representative: Foxi the Fox",
          description: "Fresh and sweet. Cool fragrance like an early summer morning."
        },
        {
          name: "Japanese Fuji Apple",
          character: "Representative: Hedi the Hedgehog",
          description: "Sweet and fresh. Fresh fragrance like a ripe apple orchard."
        },
        {
          name: "Japanese Yuzu Citrus",
          character: "Representative: Owli the Owl",
          description: "Dynamic and clever. Lightly sour, refreshing fragrance."
        },
        {
          name: "Japanese Peach Mono",
          character: "Representative: Owli the Owl",
          description: "Calm, intelligent and loves tranquility."
        }
      ],
      carePhilosophy: "Care Philosophy",
      careDescription: "Each fragrance is an emotional shade – a way for children to express what they like, and choose the world they belong to. With Etsuko, each bath is not just about cleaning – but a way for children to connect with themselves, in the most natural and gentle way.",
      ourCommitment: "Our Commitment",
      commitments: [
        { title: "Absolute Safety", description: "Strict quality testing" },
        { title: "Sincere Love", description: "Understanding and respecting each baby" },
        { title: "Premium Quality", description: "Natural ingredients from Japan" }
      ],
      ctaTitle: "Care for Your Baby with Etsuko",
      ctaDescription: "So that every bath time moment becomes a joy, every skin is gently protected, and every baby is free to express themselves in their own unique way.",
      contactConsult: "Contact for Consultation",
      viewMoreProducts: "View More Products",
      featuresTitle: "Outstanding Features",
      features: [
        "Balanced pH, gentle as tears",
        "No harsh soap",
        "No eye irritation",
        "Suitable for daily use"
      ]
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.vi;

  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", "etsuko", currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", "etsuko")
        .eq("language_code", currentLanguage)
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
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 overflow-hidden"
        style={{
          backgroundImage: `url(${etsukoHeroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
        
        {/* Decorative wave shapes */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-24 text-green-400">
            <path d="M0,0V60c60,20,120,40,180,40s120-20,180-40s120-20,180-40s120,20,180,40s120,20,180,40s120-20,180-40s120-20,180-40V0Z" 
                  fill="currentColor" fillOpacity="0.3"/>
          </svg>
        </div>
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <ArrowLeft size={20} />
              {t.backToHome}
            </Link>
            <LanguageSwitcher />
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-16">
            <div className="flex-1 text-center lg:text-left">
              <img src={etsukoLogo} alt="Etsuko Logo" className="w-64 h-auto mx-auto lg:mx-0 mb-8 animate-fade-in" />
              <h1 className="text-5xl lg:text-6xl font-bold text-orange-600 mb-6 animate-fade-in">
                ETSUKO
              </h1>
              <p className="text-2xl text-green-700 font-medium mb-8 animate-fade-in">
                {t.slogan}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl animate-fade-in">
                {t.heroDescription}
              </p>
            </div>
            
            <div className="flex-1">
              <img src={etsukoCharacters} alt="Etsuko Characters" className="w-full h-auto animate-scale-in" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-16">{t.brandStory}</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-orange-600">{t.nameOrigin}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.nameDescription}
                </p>
                <div className="flex items-center gap-4">
                  <Heart className="w-8 h-8 text-pink-500" />
                  <span className="text-lg font-medium text-gray-800">{t.fromHeart}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8">
                <h4 className="text-xl font-semibold text-green-700 mb-4">{t.philosophy}</h4>
                <ul className="space-y-3 text-gray-700">
                  {t.philosophyItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Natural Ingredients Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-700 mb-8">{t.naturalIngredients}</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
              {t.ingredientsDescription}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hoàng bá (Oubaku)</h3>
                <p className="text-gray-600">Kháng khuẩn, chống viêm, làm dịu những vùng da kích ứng</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Yuzu Ceramide</h3>
                <p className="text-gray-600">Phục hồi hàng rào bảo vệ da tự nhiên</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tảo Eisenia & Okura</h3>
                <p className="text-gray-600">Cung cấp độ ẩm sâu, giúp tóc mềm mượt</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-semibold text-green-700 mb-4">{t.featuresTitle}</h4>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <ul className="space-y-3">
                  {t.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {t.features.slice(2).map((feature, index) => (
                    <li key={index + 2} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-orange-600 mb-16">{t.featuredProducts}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.products.map((product, index) => (
                <div key={index} className={`bg-gradient-to-br rounded-2xl p-6 text-center hover:shadow-lg transition-all ${
                  index === 0 ? 'from-green-50 to-green-100' :
                  index === 1 ? 'from-red-50 to-pink-100' :
                  index === 2 ? 'from-yellow-50 to-orange-100' :
                  'from-orange-50 to-red-100'
                }`}>
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    index === 0 ? 'bg-orange-200' :
                    index === 1 ? 'bg-pink-200' :
                    index === 2 ? 'bg-yellow-200' :
                    'bg-orange-200'
                  }`}>
                    <span className="text-2xl">
                      {index === 0 ? '🦊' : index === 1 ? '🦔' : '🦉'}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    index === 0 ? 'text-green-700' :
                    index === 1 ? 'text-pink-700' :
                    index === 2 ? 'text-yellow-700' :
                    'text-orange-700'
                  }`}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{product.character}</p>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <img src={etsukoProducts} alt="Etsuko Products" className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-orange-600 mb-8">{t.carePhilosophy}</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {t.careDescription}
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-6">{t.ourCommitment}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {t.commitments.map((commitment, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      index === 0 ? 'bg-green-100' :
                      index === 1 ? 'bg-pink-100' :
                      'bg-yellow-100'
                    }`}>
                      {index === 0 ? <Shield className="w-8 h-8 text-green-600" /> :
                       index === 1 ? <Heart className="w-8 h-8 text-pink-600" /> :
                       <Star className="w-8 h-8 text-yellow-600" />}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{commitment.title}</h4>
                    <p className="text-sm text-gray-600">{commitment.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              {t.contactConsult}
            </Link>
            <Link 
              to="/brands" 
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-colors"
            >
              {t.viewMoreProducts}
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      {elements.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Thông tin chi tiết</h2>
              {elements.map(renderElement)}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default EtsukoDynamic;