import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Verites = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Verites</h1>
            <p className="text-xl text-muted-foreground">
              Giải pháp chăm sóc sức khỏe toàn diện
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Về Verites</h2>
              <p className="text-muted-foreground leading-relaxed">
                Verites là thương hiệu chuyên về các sản phẩm chăm sóc sức khỏe 
                và dinh dưỡng, mang đến những giải pháp toàn diện cho sức khỏe 
                của cả gia đình.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Với công nghệ tiên tiến và nghiên cứu khoa học sâu rộng, 
                Verites cam kết cung cấp những sản phẩm chất lượng cao, 
                an toàn và hiệu quả.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Danh mục sản phẩm</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Thực phẩm bổ sung</li>
                <li>• Vitamin và khoáng chất</li>
                <li>• Sản phẩm hỗ trợ tiêu hóa</li>
                <li>• Chăm sóc sức khỏe tim mạch</li>
                <li>• Tăng cường miễn dịch</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Sứ mệnh Verites
            </h3>
            <p className="text-muted-foreground text-lg">
              "Đồng hành cùng mọi gia đình Việt Nam trong việc xây dựng lối sống 
              khỏe mạnh và chất lượng cuộc sống tốt hơn mỗi ngày."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verites;