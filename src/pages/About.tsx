import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageRenderer } from "@/components/PageRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Users, Target, Eye, Globe, TrendingUp, Building } from "lucide-react";
import { Link } from "react-router-dom";
import imvBuilding from "@/assets/imv-building.png";
import ourBusiness from "@/assets/our-business.png";

const About = () => {
  const { currentLanguage } = useLanguage();
  const achievements = [
    {
      icon: <Globe className="text-primary" size={32} />,
      title: "25+",
      subtitle: "Năm kinh nghiệm"
    },
    {
      icon: <Users className="text-primary" size={32} />,
      title: "200+",
      subtitle: "Nhân viên chuyên nghiệp"
    },
    {
      icon: <Building className="text-primary" size={32} />,
      title: "15+",
      subtitle: "Thương hiệu quốc tế"
    },
    {
      icon: <TrendingUp className="text-primary" size={32} />,
      title: "1000+",
      subtitle: "Điểm bán trên toàn quốc"
    }
  ];

  const brands = [
    {
      category: "Ảnh & In Ấn",
      description: "Các sản phẩm máy ảnh, máy in và giải pháp in ấn chuyên nghiệp",
      items: ["FUJIFILM Instax", "FUJIFILM Photo Imaging", "FUJIFILM Printing Solutions"]
    },
    {
      category: "Chăm Sóc Mẹ & Bé", 
      description: "Sản phẩm chăm sóc mẹ và bé an toàn, chất lượng từ Nhật Bản",
      items: ["Pigeon", "Etsuko", "Các sản phẩm chăm sóc trẻ em"]
    },
    {
      category: "Mỹ Phẩm & Chăm Sóc Da",
      description: "Thương hiệu mỹ phẩm cao cấp và sản phẩm chăm sóc da tiên tiến",
      items: ["ASTALIFT", "Verites", "Các thương hiệu skincare premium"]
    },
    {
      category: "Y Tế & Chẩn Đoán Hình Ảnh",
      description: "Thiết bị y tế và giải pháp chẩn đoán hình ảnh hiện đại",
      items: ["FUJIFILM Medical Systems", "Thiết bị X-ray", "Hệ thống chẩn đoán"]
    }
  ];

  const partnerships = [
    {
      name: "FUJIFILM Holdings Corporation",
      description: "Đối tác chiến lược toàn cầu về công nghệ ảnh, y tế và mỹ phẩm",
      since: "2008"
    },
    {
      name: "Pigeon Corporation",
      description: "Thương hiệu chăm sóc mẹ và bé hàng đầu từ Nhật Bản",
      since: "2012"
    },
    {
      name: "Các đối tác quốc tế khác",
      description: "Mạng lưới đối tác rộng khắp từ Nhật Bản, Hàn Quốc, Châu Âu",
      since: "2004"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <PageRenderer 
          pageType="about" 
          language={currentLanguage}
          className="min-h-[50vh]" 
        />
        
        {/* Keep existing content as fallback/additional content */}
        <div className="container mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft size={20} />
            Quay lại trang chủ
          </Link>
          
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-foreground mb-6">Về chúng tôi</h1>
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    IMV - CÔNG TY CỔ PHẦN QUỐC TẾ MINH VIỆT
                  </h2>
                  <p className="text-lg text-primary font-semibold mb-4">
                    Đối tác đáng tin cậy tại thị trường Việt Nam
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Với hơn 25 năm kinh nghiệm, IMV là một doanh nghiệp sản xuất và phân phối có vốn đầu tư 
                    nước ngoài hàng đầu tại Việt Nam. Chúng tôi cam kết đồng hành cùng các thương hiệu trong 
                    hành trình phát triển, thúc đẩy đổi mới sáng tạo và nuôi dưỡng thế hệ trẻ tài năng – 
                    tạo nên một hệ sinh thái hợp tác năng động.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Từ ý tưởng đến tay người tiêu dùng, chúng tôi cung cấp cơ sở hạ tầng, mạng lưới đối tác 
                    và hiểu biết sâu sắc về thị trường để biến những sản phẩm xuất sắc thành những thương hiệu 
                    được yêu mến tại Việt Nam.
                  </p>
                </div>
                <div>
                  <img 
                    src={imvBuilding} 
                    alt="IMV Building" 
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {achievements.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{item.title}</div>
                    <div className="text-muted-foreground text-sm">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-primary" size={32} />
                  <h2 className="text-2xl font-bold text-foreground">Sứ mệnh</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao từ các 
                  thương hiệu uy tín quốc tế, góp phần nâng cao chất lượng cuộc sống và trải nghiệm 
                  của khách hàng thông qua dịch vụ phân phối chuyên nghiệp và tận tâm.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="text-primary" size={32} />
                  <h2 className="text-2xl font-bold text-foreground">Tầm nhìn</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành công ty phân phối hàng đầu Việt Nam, được tin tưởng bởi các đối tác 
                  quốc tế và yêu mến bởi người tiêu dùng, đồng thời mở rộng ra thị trường khu vực 
                  Đông Nam Á vào năm 2030.
                </p>
              </div>
            </div>

            {/* Our Business */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">
                Lĩnh vực kinh doanh
              </h2>
              <div className="text-center mb-8">
                <img 
                  src={ourBusiness} 
                  alt="Our Business Overview" 
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {brands.map((brand, index) => (
                  <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{brand.category}</h3>
                    <p className="text-muted-foreground mb-4">{brand.description}</p>
                    <div className="space-y-2">
                      {brand.items.map((item, itemIndex) => (
                        <span 
                          key={itemIndex}
                          className="inline-block mr-2 mb-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Partnerships */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Đối tác chiến lược
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {partnerships.map((partner, index) => (
                  <div key={index} className="text-center bg-muted/30 rounded-lg p-6">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                        Từ năm {partner.since}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Kết nối với chúng tôi
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Hãy liên hệ để tìm hiểu thêm về các cơ hội hợp tác và những giải pháp 
                tối ưu mà IMV có thể mang lại cho doanh nghiệp của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Liên hệ hợp tác
                </button>
                <Link to="/careers" className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
                  Cơ hội nghề nghiệp
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

export default About;