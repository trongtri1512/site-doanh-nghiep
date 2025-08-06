import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import instaxBanner from "@/assets/instax-banner.jpg";

const InstaxCamera = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Instax Vietnam</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thương hiệu máy ảnh và phim chụp lấy liền nổi tiếng, được sản xuất và tiếp thị bởi Fujifilm
            </p>
            <img 
              src={instaxBanner} 
              alt="Instax Camera Products" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Lịch sử và Triết lý thương hiệu</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Instax ra đời vào năm 1998, với sản phẩm đầu tiên là Instax Mini 10.
                </p>
                <p>
                  Thương hiệu này được xây dựng trên triết lý <strong>"để ảnh nói cho mà nghe"</strong>, 
                  tập trung vào việc lưu giữ những khoảnh khắc đáng nhớ một cách tức thì và trọn vẹn.
                </p>
                <p>
                  Instax đã vượt qua ranh giới của một chiếc máy ảnh, trở thành một thương hiệu phong cách sống. 
                  Những bức ảnh Instax không chỉ là kỷ niệm mà còn là phụ kiện trang trí, vật lưu niệm tại 
                  các sự kiện, đám cưới.
                </p>
                <p>
                  Khách hàng mục tiêu của Instax chủ yếu là Gen Z và Millennials, những người trẻ tuổi yêu thích 
                  sự sáng tạo và chia sẻ.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm nổi bật</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong>Instax Mini:</strong> Dòng máy ảnh phổ biến nhất, cho ra ảnh kích thước thẻ tín dụng</li>
                <li><strong>Instax Square:</strong> Cho ra những bức ảnh vuông cổ điển, phù hợp với sáng tạo</li>
                <li><strong>Instax Wide:</strong> Dòng máy cho ảnh khổ lớn, thích hợp chụp phong cảnh</li>
                <li><strong>Máy in ảnh di động:</strong> In ảnh trực tiếp từ điện thoại (Mini Link, Square Link)</li>
                <li><strong>Phụ kiện:</strong> Album ảnh, sticker, túi đựng máy ảnh</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Tự thể hiện bản thân</h3>
              <p className="text-muted-foreground text-sm">
                Các sản phẩm của Instax khuyến khích người dùng thể hiện cá tính qua những bức ảnh 
                và phụ kiện đi kèm.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Tính cộng đồng và chia sẻ</h3>
              <p className="text-muted-foreground text-sm">
                Định dạng ảnh nhỏ gọn của Instax giúp người dùng dễ dàng chia sẻ những kỷ niệm 
                quý giá với bạn bè và gia đình.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Kết nối số và analog</h3>
              <p className="text-muted-foreground text-sm">
                Một số dòng máy ảnh lai như Instax Mini EVO cho phép xem và chỉnh sửa ảnh kỹ thuật số 
                trước khi in.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Tinh thần Instax
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              "Mỗi khoảnh khắc đều đáng được lưu giữ. Instax giúp bạn tạo ra những kỷ niệm có thể sờ thấy, 
              chia sẻ và trân trọng suốt đời - để ảnh nói cho mà nghe."
            </p>
          </div>

          <div className="text-center bg-muted/30 rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Công ty Cổ phần Quốc tế Minh Việt (IMV)</strong> là nhà phân phối độc quyền của 
              FUJIFILM Instax tại Việt Nam.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstaxCamera;