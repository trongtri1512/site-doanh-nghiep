import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Star, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
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

  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", "etsuko"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", "etsuko")
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
          <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={20} />
            Quay lại trang chủ
          </Link>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-16">
            <div className="flex-1 text-center lg:text-left">
              <img src={etsukoLogo} alt="Etsuko Logo" className="w-64 h-auto mx-auto lg:mx-0 mb-8 animate-fade-in" />
              <h1 className="text-5xl lg:text-6xl font-bold text-orange-600 mb-6 animate-fade-in">
                ETSUKO
              </h1>
              <p className="text-2xl text-green-700 font-medium mb-8 animate-fade-in">
                Em bé hạnh phúc - Làn da khỏe mạnh
              </p>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl animate-fade-in">
                Mỗi em bé sinh ra đều mang trong mình một thế giới riêng biệt – với cá tính, cảm xúc và nhịp điệu rất riêng. 
                Etsuko ra đời để nâng niu sự khác biệt ấy – như một cái ôm dịu dàng, vừa bảo vệ làn da con mỗi ngày, 
                vừa âm thầm tôn trọng con theo cách con muốn được là chính mình.
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
            <h2 className="text-4xl font-bold text-center text-green-700 mb-16">Câu chuyện thương hiệu</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-orange-600">Ý nghĩa tên gọi "Etsuko"</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lấy cảm hứng từ "Etsuko" – trong tiếng Nhật nghĩa là em bé hạnh phúc, chúng tôi tin rằng hạnh phúc không đến từ việc uốn mình theo chuẩn mực, 
                  mà từ việc được tự do thể hiện bản thân – dù là qua mùi hương con chọn mỗi sáng, hay sự thoải mái sau lần tắm cuối ngày.
                </p>
                <div className="flex items-center gap-4">
                  <Heart className="w-8 h-8 text-pink-500" />
                  <span className="text-lg font-medium text-gray-800">Từ trái tim yêu thương trẻ em</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8">
                <h4 className="text-xl font-semibold text-green-700 mb-4">Triết lý thương hiệu</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span>Tôn trọng sự khác biệt của mỗi em bé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span>Bảo vệ làn da mỏng manh một cách dịu dàng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span>Mang lại niềm vui trong từng khoảnh khắc tắm gội</span>
                  </li>
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
            <h2 className="text-4xl font-bold text-green-700 mb-8">Dưỡng chất thiên nhiên từ Nhật Bản</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
              Etsuko mang đến công thức chăm sóc từ 9 loại thảo dược quý của Nhật Bản, cùng các thành phần cấp ẩm và phục hồi tự nhiên, 
              tạo nên lớp màng dịu lành cho làn da mỏng manh của trẻ nhỏ.
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
              <h4 className="text-2xl font-semibold text-green-700 mb-4">Đặc điểm nổi bật</h4>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Độ pH cân bằng, nhẹ dịu như nước mắt</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Không chứa xà phòng mạnh</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Không gây cay mắt</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Phù hợp sử dụng hằng ngày</span>
                  </li>
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
            <h2 className="text-4xl font-bold text-center text-orange-600 mb-16">SẢN PHẨM NỔI BẬT</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Melon Product */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🦊</span>
                </div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Hương Dưa Lưới Nhật</h3>
                <p className="text-sm text-gray-600 mb-3">Đại diện: Cáo Foxi</p>
                <p className="text-sm text-gray-700">Thanh mát, dịu ngọt. Mùi hương mát lạnh như buổi sớm mùa hè.</p>
              </div>
              
              {/* Apple Product */}
              <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🦔</span>
                </div>
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Táo Fuji Nhật</h3>
                <p className="text-sm text-gray-600 mb-3">Đại diện: Nhím Hedi</p>
                <p className="text-sm text-gray-700">Ngọt ngão, tươi mới. Hương thơm thanh mát như một vườn táo chín.</p>
              </div>
              
              {/* Yuzu Product */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🦉</span>
                </div>
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">Yuzu Quýt Nhật</h3>
                <p className="text-sm text-gray-600 mb-3">Đại diện: Cú Owli</p>
                <p className="text-sm text-gray-700">Năng động, lanh lợi. Mùi hương chua nhẹ, the mát.</p>
              </div>
              
              {/* Peach Product */}
              <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🦉</span>
                </div>
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Mono Đào Nhật</h3>
                <p className="text-sm text-gray-600 mb-3">Đại diện: Cú Owli</p>
                <p className="text-sm text-gray-700">Điềm đạm, thông minh và yêu thích sự yên bình.</p>
              </div>
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
            <h2 className="text-4xl font-bold text-orange-600 mb-8">Triết lý chăm sóc</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Mỗi mùi hương là một sắc thái cảm xúc – là cách con nói lên điều mình thích, và tự chọn lấy thế giới mình thuộc về. 
              Với Etsuko, mỗi lần tắm không chỉ là làm sạch – mà là một cách con kết nối với chính mình, theo cách tự nhiên và dịu dàng nhất.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-6">Cam kết của chúng tôi</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">An toàn tuyệt đối</h4>
                  <p className="text-sm text-gray-600">Kiểm tra chất lượng nghiêm ngặt</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Yêu thương chân thành</h4>
                  <p className="text-sm text-gray-600">Hiểu và tôn trọng từng em bé</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Chất lượng hàng đầu</h4>
                  <p className="text-sm text-gray-600">Thành phần thiên nhiên từ Nhật Bản</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Cùng Etsuko chăm sóc bé yêu</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Để mỗi khoảnh khắc tắm gội trở thành niềm vui, mỗi làn da được bảo vệ dịu dàng, 
            và mỗi em bé được tự do thể hiện bản thân theo cách riêng của mình.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Liên hệ tư vấn
            </Link>
            <Link 
              to="/brands" 
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-colors"
            >
              Xem thêm sản phẩm
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