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
          <div className="grid grid-cols-1 gap-6">
            {/* IMV Building Image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/lovable-uploads/b393a4a5-1ed9-4996-937a-22c0768f1dd7.png"
                alt="IMV Vietnam Office Building"
                className="w-full h-48 object-cover"
              />
            </div>
            
            {/* Modern Office Building Image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/lovable-uploads/76170711-dd2d-4132-93e1-df62f46e595e.png"
                alt="Modern Office Building"
                className="w-full h-48 object-cover"
              />
            </div>
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