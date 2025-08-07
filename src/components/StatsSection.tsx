import { Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const StatsSection = () => {
  const { currentLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const statsVi = [
    {
      number: "29",
      unit: "năm",
      description: "nâng tầm cuộc sống, vững vàng tương lai"
    },
    {
      number: "100%",
      description: "năng lượng tái tạo được sử dụng",
      note: "*Thông tin căn cứ vào chứng chỉ IREC do Swiss Carbon Asset Ltd cấp cho IMV Group xác nhận việc sử dụng năng lượng tái tạo tại Việt Nam cho giai đoạn 1/1/2023 đến 31/12/2023"
    },
    {
      number: "7 triệu",
      description: "sản phẩm bán ra mỗi ngày",
      note: "*Thông tin căn cứ vào thống kê bán hàng nội bộ"
    },
    {
      number: "Top 1",
      description: "nơi làm việc tốt nhất Việt Nam",
      note: "*Thông tin căn cứ vào xếp hạng năm 2024 của Anphabe"
    }
  ];

  const statsEn = [
    {
      number: "29",
      unit: "years",
      description: "elevating life, securing the future"
    },
    {
      number: "100%",
      description: "renewable energy used",
      note: "*Information based on IREC certificate issued by Swiss Carbon Asset Ltd for IMV Group confirming the use of renewable energy in Vietnam for the period from 1/1/2023 to 31/12/2023"
    },
    {
      number: "7 million",
      description: "products sold daily",
      note: "*Information based on internal sales statistics"
    },
    {
      number: "Top 1",
      description: "best workplace in Vietnam",
      note: "*Information based on 2024 ranking by Anphabe"
    }
  ];

  const stats = currentLanguage === 'en' ? statsEn : statsVi;
  const companyText = currentLanguage === 'en' ? 'We are IMV Vietnam' : 'Chúng tôi là IMV Việt Nam';

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Company identity card */}
          <div className={`lg:col-span-1 bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl text-center flex flex-col justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <Leaf className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 mx-auto bg-yellow-400/20 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-xl font-bold leading-tight">{companyText}</h3>
          </div>

          {/* Stats cards */}
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  {stat.unit && (
                    <div className="text-lg lg:text-xl font-semibold mb-3 text-cyan-100">
                      {stat.unit}
                    </div>
                  )}
                  <div className="text-sm lg:text-base font-medium mb-4 leading-relaxed">
                    {stat.description}
                  </div>
                  {stat.note && (
                    <div className="text-xs opacity-80 leading-tight bg-black/20 p-2 rounded-lg">
                      {stat.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;