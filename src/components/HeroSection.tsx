import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-r from-brand-yellow via-brand-yellow to-teal-400 overflow-hidden">
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
            CHÀO MỪNG BẠN<br />
            ĐẾN VỚI IMV<br />
            VIETNAM
          </h1>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            size="lg"
          >
            Tìm hiểu thêm về Công ty chúng tôi
          </Button>
        </div>

        {/* Right illustration area */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Decorative bubbles */}
            <div className="absolute w-4 h-4 bg-white/30 rounded-full animate-pulse" style={{top: '20%', left: '10%'}}></div>
            <div className="absolute w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{top: '40%', right: '20%', animationDelay: '0.5s'}}></div>
            <div className="absolute w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{bottom: '30%', left: '30%', animationDelay: '1s'}}></div>
            <div className="absolute w-5 h-5 bg-white/25 rounded-full animate-pulse" style={{top: '60%', right: '40%', animationDelay: '1.5s'}}></div>
            <div className="absolute w-8 h-8 bg-white/15 rounded-full animate-pulse" style={{bottom: '20%', right: '10%', animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C400,120 800,0 1200,60 L1200,120 L0,120 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;