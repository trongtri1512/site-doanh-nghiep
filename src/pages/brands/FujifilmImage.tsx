import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Camera, Printer, Image, Award } from "lucide-react";
import { Link } from "react-router-dom";

const FujifilmImage = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Fujifilm Image</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Giải pháp in ảnh chuyên nghiệp và giấy in cao cấp từ Fujifilm
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Fujifilm Image</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fujifilm Image mang đến những giải pháp in ảnh chuyên nghiệp và giấy in cao cấp 
                  từ thương hiệu Fujifilm danh tiếng với hơn 80 năm kinh nghiệm trong ngành công nghệ hình ảnh.
                </p>
                <p>
                  Với công nghệ tiên tiến và chất lượng vượt trội, các sản phẩm Fujifilm Image được 
                  tin dùng bởi các nhiếp ảnh gia chuyên nghiệp, studio ảnh và các doanh nghiệp 
                  in ấn trên toàn thế giới.
                </p>
                <p>
                  IMV tự hào là nhà phân phối chính thức các sản phẩm Fujifilm Image tại Việt Nam, 
                  mang đến cho khách hàng những sản phẩm chính hãng với chất lượng cao nhất.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm chính</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Image size={16} className="text-primary mt-1" />
                  <span><strong>Giấy in ảnh Fujifilm:</strong> Chất lượng cao, độ bền màu vượt trội</span>
                </li>
                <li className="flex items-start gap-2">
                  <Printer size={16} className="text-primary mt-1" />
                  <span><strong>Máy in chuyên nghiệp:</strong> Dòng máy in Frontier và DL series</span>
                </li>
                <li className="flex items-start gap-2">
                  <Camera size={16} className="text-primary mt-1" />
                  <span><strong>Hóa chất in ảnh:</strong> Bộ hóa chất chính hãng cho máy in</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award size={16} className="text-primary mt-1" />
                  <span><strong>Phụ kiện:</strong> Ribbon, carrier và các phụ kiện chuyên dụng</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Chất lượng vượt trội</h3>
              <p className="text-muted-foreground text-sm">
                Công nghệ Crystal Archive từ Fujifilm đảm bảo độ bền màu và chất lượng hình ảnh 
                tối ưu cho mọi sản phẩm in ảnh.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Đa dạng sản phẩm</h3>
              <p className="text-muted-foreground text-sm">
                Từ giấy in ảnh thông thường đến các loại giấy chuyên dụng như metallic, lustre, 
                đáp ứng mọi nhu cầu in ảnh.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Hỗ trợ chuyên nghiệp</h3>
              <p className="text-muted-foreground text-sm">
                Đội ngũ kỹ thuật chuyên nghiệp của IMV luôn sẵn sàng hỗ trợ khách hàng về 
                kỹ thuật và bảo hành sản phẩm.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
              Dòng sản phẩm nổi bật
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Giấy in ảnh Fujifilm Crystal Archive</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Độ bền màu tối ưu trên 100 năm</li>
                  <li>• Chất lượng hình ảnh sắc nét, màu sắc chân thực</li>
                  <li>• Đa dạng kích thước từ 3R đến 20R</li>
                  <li>• Các loại bề mặt: Glossy, Lustre, Pearl, Metallic</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Máy in Fujifilm Frontier</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Công nghệ in laser chính xác cao</li>
                  <li>• Tốc độ in nhanh, năng suất cao</li>
                  <li>• Hệ thống quản lý màu tự động</li>
                  <li>• Thiết kế nhỏ gọn, dễ vận hành</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Đối tác tin cậy cho giải pháp in ảnh
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
              IMV cam kết mang đến cho khách hàng những sản phẩm Fujifilm Image chính hãng, 
              chất lượng cao với dịch vụ hỗ trợ tận tâm và chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Liên hệ tư vấn
              </button>
              <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
                Xem bảng giá
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FujifilmImage;