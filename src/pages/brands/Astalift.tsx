import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import astaliftBanner from "@/assets/astalift-banner.png";

const Astalift = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Astalift Vietnam</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thương hiệu mỹ phẩm độc đáo, được phát triển và sản xuất bởi tập đoàn công nghệ Fujifilm của Nhật Bản
            </p>
            <img 
              src={astaliftBanner} 
              alt="Astalift Products" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Lịch sử và Triết lý thương hiệu</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Năm 2007:</strong> Fujifilm chính thức ra mắt thương hiệu mỹ phẩm Astalift tại Nhật Bản, 
                  đánh dấu một bước đột phá bất ngờ từ một công ty chuyên về phim ảnh sang lĩnh vực chăm sóc da.
                </p>
                <p>
                  <strong>Lý do ra đời:</strong> Trong suốt 80 năm phát triển ngành phim ảnh, Fujifilm đã tích lũy 
                  kiến thức sâu rộng về các công nghệ liên quan đến Collagen, chất chống oxy hóa và công nghệ Nano, 
                  những yếu tố cốt lõi trong việc bảo quản màu sắc của phim ảnh.
                </p>
                <p>
                  <strong>"Beauty Is A Science":</strong> Đây là triết lý trung tâm của Astalift. Thương hiệu này 
                  tin rằng vẻ đẹp bền vững không chỉ đến từ các thành phần tự nhiên mà còn từ sự ứng dụng của 
                  khoa học và công nghệ tiên tiến.
                </p>
                <p>
                  <strong>"Tomorrow will be more beautiful than today":</strong> Tên "Astalift" thể hiện triết lý này - 
                  "Asta" từ "Ashita" (ngày mai), "Lift" thể hiện sự nâng cao vẻ đẹp.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Công nghệ cốt lõi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong>Nghiên cứu về Collagen:</strong> Ba loại collagen đặc biệt cho Astalift</li>
                <li><strong>Công nghệ chống oxy hóa:</strong> Bảo vệ da khỏi tia UV và tác nhân gây hại</li>
                <li><strong>Công nghệ Nano:</strong> Giảm kích thước phân tử để thẩm thấu sâu hơn</li>
                <li><strong>Astaxanthin:</strong> Chất chống oxy hóa mạnh hơn CoQ10 gấp 1000 lần</li>
                <li><strong>Nano Lycopene:</strong> Chiết xuất từ cà chua, bảo vệ và trẻ hóa da</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Jelly Aquarysta</h3>
              <p className="text-muted-foreground text-sm">
                Thạch dưỡng da chứa ceramide công nghệ nano, cung cấp độ ẩm sâu và 
                củng cố hàng rào bảo vệ da.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">D-UV Clear White Solution</h3>
              <p className="text-muted-foreground text-sm">
                Kem chống nắng SPF 50 PA++++, chống tia UV, dưỡng trắng và cấp ẩm 
                với công nghệ độc quyền Fujifilm.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Nước uống Collagen</h3>
              <p className="text-muted-foreground text-sm">
                Sản phẩm bổ sung collagen dạng nước, hỗ trợ tái tạo và ngăn ngừa 
                lão hóa da từ bên trong.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Cam kết Astalift
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              "Kết hợp hoàn hảo giữa khoa học và tự nhiên để mang đến làn da trẻ trung, khỏe mạnh 
              và rạng rỡ vượt thời gian. Vẻ đẹp là một khoa học - ngày mai sẽ đẹp hơn ngày hôm nay."
            </p>
          </div>

          <div className="text-center bg-muted/30 rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Công ty Cổ phần Quốc tế Minh Việt (IMV)</strong> là nhà phân phối độc quyền của 
              FUJIFILM Astalift tại Việt Nam.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Astalift;