import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import veritesBanner from "@/assets/verites-banner.jpg";

const Verites = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Verites Vietnam</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thương hiệu mỹ phẩm, đặc biệt là nước hoa và các sản phẩm chăm sóc cơ thể có hương thơm
            </p>
            <img 
              src={veritesBanner} 
              alt="Verites Products" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Lịch sử và Triết lý thương hiệu</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>"Nghệ thuật của sự thật":</strong> Tên thương hiệu Verites được lấy cảm hứng từ từ "Vérité" 
                  trong tiếng Pháp, có nghĩa là "sự thật". Triết lý của thương hiệu là tôn vinh sự thật đằng sau 
                  mỗi mùi hương, không phụ thuộc vào vẻ ngoài lấp lánh hay sự phô trương.
                </p>
                <p>
                  <strong>Thương hiệu Việt Nam dành cho người Việt trẻ:</strong> Verites được giới thiệu là một 
                  thương hiệu nước hoa có xuất xứ tại Việt Nam, dành riêng cho giới trẻ Việt Nam (độ tuổi 20-25) 
                  với mức giá phải chăng.
                </p>
                <p>
                  <strong>Sang trọng, tối giản, và giá cả hợp lý:</strong> Verites mang đến những mùi hương trứ danh 
                  trong bao bì tối giản, thanh lịch nhưng vẫn có mức giá phải chăng để mọi người đều có thể sử dụng 
                  nước hoa mỗi ngày.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm nổi bật</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong>Nước hoa Eau de Parfum (EDP):</strong> Dòng chính với nồng độ tinh dầu cao</li>
                <li><strong>Nước hoa dành cho nam:</strong> Mùi hương mạnh mẽ, nam tính</li>
                <li><strong>Nước hoa dành cho nữ:</strong> Mùi hương ngọt ngào, quyến rũ</li>
                <li><strong>Nước hoa unisex:</strong> Phù hợp cho cả nam và nữ</li>
                <li><strong>Sản phẩm chăm sóc cơ thể:</strong> Với hương thơm đặc trưng</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Mùi hương thuộc về cá nhân</h3>
              <p className="text-muted-foreground text-sm">
                Verites tin rằng mùi hương là một câu chuyện trên làn da và trong ký ức của mỗi người.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Giá cả phải chăng</h3>
              <p className="text-muted-foreground text-sm">
                Mang đến nước hoa chất lượng cao với mức giá hợp lý cho giới trẻ Việt Nam.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Thiết kế tối giản</h3>
              <p className="text-muted-foreground text-sm">
                Bao bì tối giản, thanh lịch, tập trung vào chất lượng sản phẩm bên trong.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Triết lý Verites
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              "Mùi hương thuộc về cá nhân, là một câu chuyện trên làn da và trong ký ức của mỗi người. 
              Verites tôn vinh sự thật đằng sau mỗi mùi hương, mang đến vẻ đẹp tự nhiên và chân thực nhất."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verites;