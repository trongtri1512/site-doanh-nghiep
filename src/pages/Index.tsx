import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import AdminSection from "@/components/AdminSection";
import { Link } from "react-router-dom";

const Index = () => {
  const brands = [
    {
      name: "Pigeon",
      description: "Thương hiệu chăm sóc mẹ và bé hàng đầu từ Nhật Bản",
      category: "Chăm sóc mẹ & bé",
      link: "/brands/pigeon",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    },
    {
      name: "Astalift",
      description: "Mỹ phẩm chống lão hóa cao cấp từ Fujifilm",
      category: "Mỹ phẩm",
      link: "/brands/astalift",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    },
    {
      name: "Instax",
      description: "Máy ảnh chụp lấy liền phổ biến nhất thế giới",
      category: "Ảnh & In ấn",
      link: "/brands/instax-camera",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    },
    {
      name: "Fujifilm Image",
      description: "Giải pháp in ảnh chuyên nghiệp và giấy in cao cấp",
      category: "Ảnh & In ấn",
      link: "/brands/fujifilm-image",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    },
    {
      name: "Verites",
      description: "Thương hiệu nước hoa Việt Nam cho giới trẻ",
      category: "Mỹ phẩm",
      link: "/brands/verites",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    },
    {
      name: "Etsuko",
      description: "Sản phẩm chăm sóc bé an toàn từ Nhật Bản",
      category: "Chăm sóc mẹ & bé",
      link: "/brands/etsuko",
      logo: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      
      {/* Brands Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Các nhãn hàng đồng hành
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IMV tự hào là đối tác phân phối chính thức của nhiều thương hiệu uy tín hàng đầu thế giới, 
              mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao và dịch vụ tận tâm.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <Link 
                key={index}
                to={brand.link}
                className="group bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <img 
                      src={brand.logo}
                      alt={brand.name}
                      className="w-8 h-8 object-contain filter brightness-0 opacity-60 group-hover:opacity-80 transition-opacity"
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
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Khám phá thêm về các thương hiệu và sản phẩm mà chúng tôi phân phối
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tìm hiểu thêm về IMV
            </Link>
          </div>
        </div>
      </section>

      <AdminSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
