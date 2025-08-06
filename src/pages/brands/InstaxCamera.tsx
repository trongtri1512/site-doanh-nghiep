import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InstaxCamera = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Instax Camera</h1>
            <p className="text-xl text-muted-foreground">
              Ghi lại khoảnh khắc, in ngay lập tức
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Instax Camera</h2>
              <p className="text-muted-foreground leading-relaxed">
                Instax Camera mang đến trải nghiệm nhiếp ảnh độc đáo với công nghệ 
                in ảnh tức thì, giúp bạn ghi lại và lưu giữ những khoảnh khắc 
                đáng nhớ một cách vật lý và ý nghĩa.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Từ những buổi tiệc, du lịch đến các dịp đặc biệt, Instax Camera 
                tạo ra những tấm ảnh có thể cầm trên tay ngay lập tức, mang lại 
                cảm giác nostalgic và chân thực.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Dòng sản phẩm</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Instax Mini Series</li>
                <li>• Instax Wide Series</li>
                <li>• Instax Square Series</li>
                <li>• Film và phụ kiện</li>
                <li>• Album và khung ảnh</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Tinh thần Instax
            </h3>
            <p className="text-muted-foreground text-lg">
              "Mỗi khoảnh khắc đều đáng được lưu giữ. Instax giúp bạn tạo ra 
              những kỷ niệm có thể sờ thấy, chia sẻ và trân trọng suốt đời."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstaxCamera;