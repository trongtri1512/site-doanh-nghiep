import { Leaf } from "lucide-react";

const StatsSection = () => {
  const stats = [
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company identity card */}
          <div className="lg:col-span-1 bg-primary text-white p-8 rounded-lg text-center flex flex-col justify-center">
            <Leaf className="w-12 h-12 mx-auto mb-4 text-brand-yellow" />
            <h3 className="text-xl font-bold mb-2">Chúng tôi là IMV Việt Nam</h3>
          </div>

          {/* Stats cards */}
          {stats.map((stat, index) => (
            <div key={index} className="bg-primary text-white p-6 rounded-lg">
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              {stat.unit && <div className="text-lg font-semibold mb-2">{stat.unit}</div>}
              <div className="text-sm lg:text-base font-medium mb-3">{stat.description}</div>
              {stat.note && (
                <div className="text-xs opacity-80 leading-tight">{stat.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;