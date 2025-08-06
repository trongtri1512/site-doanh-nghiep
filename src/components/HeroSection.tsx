import { Button } from "@/components/ui/button";

const HeroSection = () => {
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

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl">
          {/* Text Content with Beautiful Frame */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              CHÀO MỪNG BẠN<br />
              ĐẾN VỚI IMV<br />
              VIETNAM
            </h1>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Tìm hiểu thêm về Công ty chúng tôi
            </Button>
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