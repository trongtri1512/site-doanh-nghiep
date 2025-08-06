import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Astalift = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Astalift</h1>
            <p className="text-xl text-muted-foreground">
              Công nghệ chống lão hóa tiên tiến
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Astalift</h2>
              <p className="text-muted-foreground leading-relaxed">
                Astalift là thương hiệu mỹ phẩm cao cấp từ Fujifilm, ứng dụng 
                công nghệ nano độc quyền và thành phần Astaxanthin mạnh mẽ 
                để mang đến giải pháp chống lão hóa hiệu quả.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Với hơn 80 năm kinh nghiệm trong lĩnh vực công nghệ hình ảnh, 
                Fujifilm đã chuyển giao chuyên môn về collagen và chất chống 
                oxy hóa vào sản phẩm chăm sóc da Astalift.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Công nghệ tiên tiến</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Nano Astaxanthin</li>
                <li>• Nano Lycopene</li>
                <li>• Collagen peptide</li>
                <li>• Công nghệ nano hóa</li>
                <li>• Phức hợp chống lão hóa</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Cam kết Astalift
            </h3>
            <p className="text-muted-foreground text-lg">
              "Kết hợp hoàn hảo giữa khoa học và tự nhiên để mang đến làn da 
              trẻ trung, khỏe mạnh và rạng rỡ vượt thời gian."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Astalift;