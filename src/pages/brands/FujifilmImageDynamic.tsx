import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingCart, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import fujifilmLogo from "@/assets/logos/fujifilm-logo.png";
import fujifilmMachine from "@/assets/fujifilm-frontier-machine.jpg";

const FujifilmImageDynamic = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const productCategories = [
    {
      title: "1 - Giấy ảnh màu Fujifilm:",
      items: [
        "5IN X 610FT TYPE CA GLOSSY/ LUSTRE -GY",
        "6IN x 610FT TYPE CA GLOSSY/ LUSTER -GY", 
        "8IN x 295FT TYPE CA GLOSSY-GY",
        "10IN x 295FT TYPE CA GLOSSY-GY",
        "12IN X 295FT TYPE CA GLOSSY-GY",
        "24IN X 295FT TYPE CA GLOSSY-GY",
        "30IN X 295FT TYPE CA GLOSSY-GY",
        "50IN X 164FT TYPE CA GLOSSY OUT-GY"
      ]
    },
    {
      title: "2-Hóa chất tráng rửa ảnh màu Fujifilm:",
      items: [
        "CP RA PRO P1R(2X40L)",
        "SP VR P2R 2X5L CONC (SUPER P2R)",
        "UNIVERSAL STARTER P1S 1X1L",
        "CP49LR PC X 2",
        "FUJI SUPER CONDITIONER 100 TAB (no CO)",
        "SUPER PRO P1R 4X20L (w/o CO)",
        "CP-49E P1S 3.7L (NEW)",
        "CP-49E P2S 3.7L (NEW)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Blue Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <img 
                src={fujifilmLogo} 
                alt="Fujifilm Logo" 
                className="h-16 mx-auto mb-8 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-fade-in">
              Imaging VietNam
            </h1>
            
            {/* Introduction Text */}
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
              <p className="font-semibold text-foreground">
                Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp vật tư ngành ảnh, Phòng Imaging tự hào là đối tác phân phối chính thức các dòng giấy in ảnh màu và hóa chất tráng rửa ảnh chuyên dụng của Fujifilm – thương hiệu hàng đầu thế giới trong công nghệ hình ảnh.
              </p>
              <p>
                Chúng tôi mang đến giải pháp toàn diện cho các phòng lab, studio ảnh, cửa hàng rửa ảnh, và các đơn vị in ảnh kỹ thuật số chuyên nghiệp, với sản phẩm chất lượng cao, hiệu suất ổn định và đáp ứng các tiêu chuẩn quốc tế khắt khe nhất.
              </p>
            </div>
          </div>

          {/* Main Product Image */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={fujifilmMachine} 
                alt="Fujifilm Frontier DX-100" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Product Categories */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Danh mục sản phẩm bao gồm
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {productCategories.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex}
                  className="bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold text-primary mb-6 border-b border-border pb-3">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-start gap-3 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors"></div>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment Section */}
          <div className={`bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Cam kết chất lượng
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chúng tôi cam kết cung cấp sản phẩm chính hãng Fujifilm, đầy đủ chứng từ, chế độ bảo hành rõ ràng, hỗ trợ kỹ thuật tận tâm và giao hàng nhanh chóng trên toàn quốc.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className={`text-center bg-gradient-to-br from-accent/5 to-background rounded-2xl p-8 md:p-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Sứ mệnh của chúng tôi
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Phòng Imaging luôn đồng hành cùng các phòng lab trong hành trình tạo nên những bức ảnh sắc nét, bền màu, và tràn đầy cảm xúc, lưu giữ những khoảnh khắc quý giá nhất trong cuộc sống.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12 shadow-xl">
              <Phone className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                Liên hệ ngay để được tư vấn
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  Liên hệ ngay
                </Link>
                <Link 
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-foreground/10 text-white rounded-lg font-semibold hover:bg-primary-foreground/20 transition-colors border border-white/20"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FujifilmImageDynamic;