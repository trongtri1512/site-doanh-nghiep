import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Pigeon = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Pigeon</h1>
            <p className="text-xl text-muted-foreground">
              Thương hiệu chăm sóc mẹ và bé hàng đầu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Pigeon</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pigeon là thương hiệu hàng đầu trong lĩnh vực chăm sóc mẹ và bé, 
                cam kết mang đến những sản phẩm chất lượng cao và an toàn nhất 
                cho các bà mẹ và em bé.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Với hơn 60 năm kinh nghiệm, Pigeon không ngừng nghiên cứu và 
                phát triển các sản phẩm innovative để hỗ trợ hành trình làm mẹ 
                của phụ nữ trên toàn thế giới.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm chính</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bình sữa và núm vú</li>
                <li>• Sản phẩm chăm sóc da em bé</li>
                <li>• Đồ dùng cho mẹ bầu</li>
                <li>• Phụ kiện cho em bé</li>
                <li>• Sản phẩm vệ sinh cá nhân</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Cam kết của Pigeon
            </h3>
            <p className="text-muted-foreground text-lg">
              "Mang đến sự an toàn, chất lượng và tình yêu thương trong từng sản phẩm 
              để hỗ trợ hành trình nuôi dạy con của các bậc phụ huynh."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pigeon;