import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { settings } = useSiteSettings();
  const { t, currentLanguage } = useLanguage();
  
  const welcomeText = currentLanguage === 'en' ? 'WELCOME TO' : 'CHÀO MỪNG BẠN ĐẾN VỚI';
  const companyName = settings.site_title?.toUpperCase() || "IMV VIETNAM";
  
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png"
          alt="IMV Vietnam Modern Office"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Scrolling Text Animation */}
      <div className="absolute top-0 left-0 right-0 bg-primary/90 text-white py-2 overflow-hidden z-20">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium">
          <span className="mx-4">🌟 {welcomeText} {companyName} - {currentLanguage === 'en' ? 'Elevating Life, Securing the Future' : 'Nâng tầm cuộc sống, vững vàng tương lai'} 🌟</span>
          <span className="mx-4">🌟 {welcomeText} {companyName} - {currentLanguage === 'en' ? 'Elevating Life, Securing the Future' : 'Nâng tầm cuộc sống, vững vàng tương lai'} 🌟</span>
          <span className="mx-4">🌟 {welcomeText} {companyName} - {currentLanguage === 'en' ? 'Elevating Life, Securing the Future' : 'Nâng tầm cuộc sống, vững vàng tương lai'} 🌟</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10 mt-12">
        <div className="max-w-2xl">
          {/* Text Content with Beautiful Frame */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl animate-fade-in hover:animate-pulse" 
                    style={{textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)'}}>
                {welcomeText}<br />
                <span className="text-yellow-400 animate-bounce inline-block">{companyName}</span>
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-6 leading-relaxed animate-fade-in animation-delay-300">
              {settings.site_description || (currentLanguage === 'en' ? 'Elevating Life, Securing the Future' : 'Nâng tầm cuộc sống, vững vàng tương lai')}
            </p>
            <Button 
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-500"
              size="lg"
            >
              {t('hero.learn_more', currentLanguage === 'en' ? 'Learn more about our Company' : 'Tìm hiểu thêm về Công ty chúng tôi')}
            </Button>
          </div>
        </div>
      </div>

      {/* Animated waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        {/* Wave 1 - Primary wave */}
        <svg 
          className="relative block w-[200%] h-20 animate-[wave1_8s_ease-in-out_infinite]" 
          viewBox="0 0 2400 120" 
          preserveAspectRatio="none"
          style={{
            animation: 'wave1 8s ease-in-out infinite'
          }}
        >
          <path 
            d="M0,60 C400,120 800,0 1200,60 C1600,120 2000,0 2400,60 L2400,120 L0,120 Z" 
            fill="white"
          />
        </svg>
        
        {/* Wave 2 - Secondary wave */}
        <svg 
          className="absolute bottom-0 w-[200%] h-16 animate-[wave2_12s_ease-in-out_infinite_reverse]" 
          viewBox="0 0 2400 120" 
          preserveAspectRatio="none"
          style={{
            animation: 'wave2 12s ease-in-out infinite reverse'
          }}
        >
          <path 
            d="M0,40 C300,100 900,20 1200,80 C1500,140 2100,40 2400,100 L2400,120 L0,120 Z" 
            fill="rgba(255,255,255,0.7)"
          />
        </svg>
        
        {/* Wave 3 - Tertiary wave */}
        <svg 
          className="absolute bottom-0 w-[200%] h-12 animate-[wave3_15s_ease-in-out_infinite]" 
          viewBox="0 0 2400 120" 
          preserveAspectRatio="none"
          style={{
            animation: 'wave3 15s ease-in-out infinite'
          }}
        >
          <path 
            d="M0,80 C600,40 600,80 1200,40 C1800,0 1800,40 2400,20 L2400,120 L0,120 Z" 
            fill="rgba(255,255,255,0.5)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;