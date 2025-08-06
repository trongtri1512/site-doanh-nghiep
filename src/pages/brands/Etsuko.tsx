import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Etsuko = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Etsuko</h1>
            <p className="text-xl text-muted-foreground">
              Vẻ đẹp tự nhiên từ Nhật Bản
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Etsuko</h2>
              <p className="text-muted-foreground leading-relaxed">
                Etsuko là thương hiệu mỹ phẩm cao cấp từ Nhật Bản, chuyên về 
                các sản phẩm chăm sóc da tự nhiên và an toàn, mang đến vẻ đẹp 
                thuần khiết theo triết lý làm đẹp Nhật Bản.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Với thành phần từ thiên nhiên và công nghệ tiên tiến, Etsuko 
                cam kết mang đến làn da khỏe mạnh, rạng rỡ và tự nhiên 
                cho phụ nữ hiện đại.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm nổi bật</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Serum dưỡng da chống lão hóa</li>
                <li>• Kem dưỡng ẩm cao cấp</li>
                <li>• Mặt nạ dưỡng da tự nhiên</li>
                <li>• Sữa rửa mặt êm dịu</li>
                <li>• Toner và essence</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Triết lý Etsuko
            </h3>
            <p className="text-muted-foreground text-lg">
              "Vẻ đẹp thật sự đến từ sự hài hòa giữa tâm hồn và cơ thể. 
              Etsuko giúp bạn tỏa sáng với vẻ đẹp tự nhiên và thuần khiết nhất."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Etsuko;