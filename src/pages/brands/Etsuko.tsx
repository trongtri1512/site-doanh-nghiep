import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import etsukoBanner from "@/assets/etsuko-banner.jpg";

const Etsuko = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Etsuko Vietnam</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thương hiệu chuyên sản phẩm chăm sóc bé
            </p>
            <img 
              src={etsukoBanner} 
              alt="Etsuko Products" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Lịch sử và Triết lý thương hiệu</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Nguồn gốc tên gọi:</strong> Tên thương hiệu Etsuko được lấy cảm hứng từ ý nghĩa 
                  "Em bé hạnh phúc" trong tiếng Nhật.
                </p>
                <p>
                  <strong>Triết lý cốt lõi:</strong> Etsuko ra đời với mong muốn mang lại thật "nhiều niềm hạnh phúc" 
                  cho bé thông qua các sản phẩm chăm sóc da an toàn và hiệu quả. Triết lý này tập trung vào việc 
                  bảo vệ và chăm sóc làn da nhạy cảm của trẻ, giúp bé luôn khỏe mạnh và vui vẻ.
                </p>
                <p>
                  <strong>Xuất xứ:</strong> Thương hiệu Etsuko có xuất xứ tại Việt Nam, tuy nhiên các sản phẩm lại 
                  được lấy cảm hứng và sử dụng các thành phần từ Nhật Bản.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm nổi bật</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong>Sữa tắm gội Etsuko Hương dưa lưới (400ml):</strong> Sản phẩm được biết đến rộng rãi</li>
                <li><strong>Sữa tắm gội Etsuko Hương quý:</strong> Dành cho làn da nhạy cảm</li>
                <li><strong>Các sản phẩm chăm sóc da khác:</strong> Kem dưỡng ẩm, dầu massage cho bé</li>
                <li><strong>Sản phẩm vệ sinh:</strong> An toàn cho trẻ em</li>
                <li><strong>Phụ kiện chăm sóc bé:</strong> Đồ dùng hàng ngày cho trẻ</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">An toàn tuyệt đối</h3>
              <p className="text-muted-foreground text-sm">
                Sản phẩm được thiết kế đặc biệt để bảo vệ làn da nhạy cảm của trẻ em, 
                đảm bảo an toàn tuyệt đối.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Thành phần tự nhiên</h3>
              <p className="text-muted-foreground text-sm">
                Sử dụng các thành phần lấy cảm hứng từ Nhật Bản, tự nhiên và lành tính 
                cho da bé.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Niềm vui cho bé</h3>
              <p className="text-muted-foreground text-sm">
                Mang đến niềm hạnh phúc cho bé qua từng lần sử dụng sản phẩm với 
                hương thơm dễ chịu.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Triết lý Etsuko
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              "Em bé hạnh phúc - Etsuko ra đời với mong muốn mang lại nhiều niềm hạnh phúc cho bé 
              thông qua các sản phẩm chăm sóc da an toàn và hiệu quả, giúp bé luôn khỏe mạnh và vui vẻ."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Etsuko;