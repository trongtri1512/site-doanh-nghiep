import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  Heart, 
  Shield, 
  Microscope, 
  Baby, 
  Award, 
  Star,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";

// Import images
import pigeonHeroModern from "@/assets/pigeon-hero-modern.jpg";
import pigeonResearch from "@/assets/pigeon-research.jpg";
import pigeonProductsModern from "@/assets/pigeon-products-modern.jpg";
import pigeonLogo from "@/assets/logos/pigeon-logo.png";

const PigeonModern = () => {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [counters, setCounters] = useState({
    years: 0,
    countries: 0,
    customers: 0,
    products: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counters
    const targets = { years: 67, countries: 50, customers: 1000000, products: 200 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        years: Math.round(targets.years * progress),
        countries: Math.round(targets.countries * progress),
        customers: Math.round(targets.customers * progress),
        products: Math.round(targets.products * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  const timelineData = [
    { year: "1957", event: currentLanguage === 'en' ? "Founded in Japan" : "Thành lập tại Nhật Bản" },
    { year: "1960s", event: currentLanguage === 'en' ? "First nursing bottles" : "Bình sữa đầu tiên" },
    { year: "1970s", event: currentLanguage === 'en' ? "International expansion" : "Mở rộng quốc tế" },
    { year: "1980s", event: currentLanguage === 'en' ? "Advanced research begins" : "Bắt đầu nghiên cứu tiên tiến" },
    { year: "2000s", event: currentLanguage === 'en' ? "Digital innovation" : "Đổi mới kỹ thuật số" },
    { year: `${currentYear}`, event: currentLanguage === 'en' ? "Global leader" : "Thương hiệu hàng đầu thế giới" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: currentLanguage === 'en' ? "Love & Care" : "Tình yêu & Chăm sóc",
      description: currentLanguage === 'en' 
        ? "Every product designed with maternal love" 
        : "Mỗi sản phẩm được thiết kế với tình yêu của người mẹ"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: currentLanguage === 'en' ? "Safety First" : "An toàn là trên hết",
      description: currentLanguage === 'en' 
        ? "Rigorous testing for complete safety" 
        : "Kiểm tra nghiêm ngặt để đảm bảo an toàn tuyệt đối"
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: currentLanguage === 'en' ? "Scientific Research" : "Nghiên cứu khoa học",
      description: currentLanguage === 'en' 
        ? "67+ years of feeding behavior research" 
        : "Hơn 67 năm nghiên cứu hành vi bú mẹ"
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: currentLanguage === 'en' ? "Baby-Centered" : "Lấy bé làm trung tâm",
      description: currentLanguage === 'en' 
        ? "Understanding each baby's unique needs" 
        : "Hiểu rõ nhu cầu riêng biệt của mỗi em bé"
    }
  ];

  const productCategories = [
    {
      name: currentLanguage === 'en' ? "Feeding & Nursing" : "Bú mẹ & Cho ăn",
      items: ["Bottles", "Nipples", "Breast Pumps", "Sterilizers"],
      color: "from-pink-500 to-rose-400"
    },
    {
      name: currentLanguage === 'en' ? "Baby Skincare" : "Chăm sóc da bé",
      items: ["Lotions", "Bath Products", "Wipes", "Diaper Cream"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: currentLanguage === 'en' ? "Maternity Care" : "Chăm sóc mẹ bầu",
      items: ["Nursing Bras", "Belly Bands", "Nipple Care", "Recovery Items"],
      color: "from-purple-500 to-indigo-400"
    },
    {
      name: currentLanguage === 'en' ? "Baby Accessories" : "Phụ kiện cho bé",
      items: ["Pacifiers", "Training Cups", "Toys", "Safety Products"],
      color: "from-green-500 to-emerald-400"
    }
  ];

  const awards = [
    "Economic Times Best Organization 2024",
    "Times of India Most Valued Brand 2020",
    "India's Best Babycare Company 2018",
    "Mother & Baby Gold Award 2021"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={pigeonHeroModern} 
            alt="Pigeon Heritage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Logo */}
            <div className="mb-8">
              <img 
                src={pigeonLogo} 
                alt="Pigeon Logo" 
                className="h-20 mx-auto animate-float"
              />
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-glow">
              <Star className="w-4 h-4" />
              {currentLanguage === 'en' ? 'Heritage Meets Innovation' : 'Di sản kết hợp Đổi mới'}
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-pink-100 to-blue-100 bg-clip-text text-transparent">
                {currentLanguage === 'en' ? '67 Years of' : '67 năm'}
              </span>
              <br />
              <span className="text-white">
                {currentLanguage === 'en' ? 'Trusted Care' : 'Chăm sóc đáng tin cậy'}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              {currentLanguage === 'en' 
                ? 'From 1957 to today, pioneering baby care solutions with love, science, and innovation'
                : 'Từ năm 1957 đến nay, tiên phong trong các giải pháp chăm sóc em bé với tình yêu, khoa học và đổi mới'
              }
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white border-0 group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {currentLanguage === 'en' ? 'Watch Our Story' : 'Xem câu chuyện của chúng tôi'}
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                {currentLanguage === 'en' ? 'Explore Products' : 'Khám phá sản phẩm'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-pink-500/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-blue-500/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-yellow-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {currentLanguage === 'en' ? 'Our Heritage Timeline' : 'Dòng thời gian di sản'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Six decades of innovation and dedication to mother and baby care'
                : 'Sáu thập kỷ đổi mới và cống hiến cho việc chăm sóc mẹ và bé'
              }
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  className={`timeline-point text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible ? 'animate-reveal-up' : 'opacity-0'
                  }`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="text-2xl font-bold text-pink-600 mb-3">{item.year}</div>
                  <div className="text-sm text-muted-foreground">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-counter-up">
              <div className="text-4xl md:text-6xl font-bold mb-2">{counters.years}+</div>
              <div className="text-sm md:text-base opacity-90">
                {currentLanguage === 'en' ? 'Years of Excellence' : 'Năm xuất sắc'}
              </div>
            </div>
            <div className="animate-counter-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl md:text-6xl font-bold mb-2">{counters.countries}+</div>
              <div className="text-sm md:text-base opacity-90">
                {currentLanguage === 'en' ? 'Countries' : 'Quốc gia'}
              </div>
            </div>
            <div className="animate-counter-up" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl md:text-6xl font-bold mb-2">{(counters.customers / 1000000).toFixed(0)}M+</div>
              <div className="text-sm md:text-base opacity-90">
                {currentLanguage === 'en' ? 'Happy Families' : 'Gia đình hạnh phúc'}
              </div>
            </div>
            <div className="animate-counter-up" style={{animationDelay: '0.6s'}}>
              <div className="text-4xl md:text-6xl font-bold mb-2">{counters.products}+</div>
              <div className="text-sm md:text-base opacity-90">
                {currentLanguage === 'en' ? 'Products' : 'Sản phẩm'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {currentLanguage === 'en' ? 'Our Core Values' : 'Giá trị cốt lõi'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'en' 
                ? 'The principles that guide everything we do for mothers and babies'
                : 'Những nguyên tắc định hướng mọi việc chúng tôi làm cho mẹ và bé'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group bg-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-border ${
                  isVisible ? 'animate-reveal-up' : 'opacity-0'
                }`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {currentLanguage === 'en' ? 'Complete Care Solutions' : 'Giải pháp chăm sóc toàn diện'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {currentLanguage === 'en' 
                ? 'From feeding to skincare, we provide everything for your baby\'s healthy development'
                : 'Từ cho ăn đến chăm sóc da, chúng tôi cung cấp mọi thứ cho sự phát triển khỏe mạnh của bé'
              }
            </p>
            <img 
              src={pigeonProductsModern} 
              alt="Pigeon Products" 
              className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl"
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {productCategories.map((category, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? 'animate-reveal-up' : 'opacity-0'
                }`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`w-full h-4 bg-gradient-to-r ${category.color} rounded-full mb-6 group-hover:h-6 transition-all duration-300`}></div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{category.name}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {currentLanguage === 'en' ? 'Science Behind Care' : 'Khoa học đằng sau sự chăm sóc'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {currentLanguage === 'en' 
                  ? 'Our Research & Development team has studied infant feeding behavior for over 67 years, creating products that truly understand your baby\'s needs.'
                  : 'Đội ngũ Nghiên cứu & Phát triển của chúng tôi đã nghiên cứu hành vi bú mẹ của trẻ sơ sinh trong hơn 67 năm, tạo ra những sản phẩm thực sự hiểu nhu cầu của bé.'
                }
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Microscope className="w-6 h-6 text-pink-600" />
                  <span className="text-foreground">
                    {currentLanguage === 'en' ? 'Advanced Feeding Research' : 'Nghiên cứu cho ăn tiên tiến'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="text-foreground">
                    {currentLanguage === 'en' ? 'Safety Testing Protocols' : 'Quy trình kiểm tra an toàn'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <span className="text-foreground">
                    {currentLanguage === 'en' ? 'International Certifications' : 'Chứng nhận quốc tế'}
                  </span>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700">
                {currentLanguage === 'en' ? 'Learn About Our Research' : 'Tìm hiểu về nghiên cứu'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src={pigeonResearch} 
                alt="Pigeon Research" 
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center text-white animate-float">
                <Microscope className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {currentLanguage === 'en' ? 'Awards & Recognition' : 'Giải thưởng & Công nhận'}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {awards.map((award, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-xs ${
                  isVisible ? 'animate-reveal-up' : 'opacity-0'
                }`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <p className="text-sm text-center text-muted-foreground">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {currentLanguage === 'en' ? 'Join the Pigeon Family' : 'Tham gia gia đình Pigeon'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {currentLanguage === 'en'
              ? 'Experience 67 years of trusted care and innovation for your precious moments with baby'
              : 'Trải nghiệm 67 năm chăm sóc đáng tin cậy và đổi mới cho những khoảnh khắc quý giá với bé'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-white/90">
              <Users className="mr-2 w-5 h-5" />
              {currentLanguage === 'en' ? 'Find Products' : 'Tìm sản phẩm'}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600">
              <Globe className="mr-2 w-5 h-5" />
              {currentLanguage === 'en' ? 'Global Locations' : 'Địa điểm toàn cầu'}
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Back to Top */}
      <div className="fixed bottom-8 left-8">
        <Link to={currentLanguage === 'en' ? '/en/brands' : '/brands'}>
          <Button variant="outline" size="sm" className="group bg-white/90 backdrop-blur-sm hover:bg-white">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {currentLanguage === 'en' ? 'Back to Brands' : 'Về trang thương hiệu'}
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default PigeonModern;