import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import pigeonBanner from "@/assets/pigeon-banner.jpg";

const Pigeon = () => {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Pigeon Vietnam</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thương hiệu hàng đầu thế giới về các sản phẩm chăm sóc mẹ và bé
            </p>
            <img 
              src={pigeonBanner} 
              alt="Pigeon Products" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Lịch sử và Triết lý thương hiệu</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Nguồn gốc:</strong> Pigeon được thành lập vào năm 1957 tại Nhật Bản bởi ông Yuichi Nakata, 
                  với tầm nhìn cung cấp các sản phẩm chất lượng, tiện lợi và an toàn cho các bà mẹ trên toàn thế giới.
                </p>
                <p>
                  <strong>Logo:</strong> Logo của Pigeon gồm hai trái tim lồng vào nhau, tượng trưng cho mối liên kết 
                  giữa trái tim lớn của mẹ và trái tim nhỏ của bé. Hình ảnh này thể hiện tình yêu và sự bao bọc 
                  vô tận của mẹ dành cho con.
                </p>
                <p>
                  <strong>Triết lý cốt lõi:</strong> Pigeon tập trung vào sự đổi mới dựa trên nghiên cứu khoa học, 
                  đặc biệt là nghiên cứu về hành vi bú mẹ của trẻ sơ sinh trong hơn 50 năm. Điều này đã tạo nên 
                  nền tảng cho việc phát triển các sản phẩm như núm ti và bình sữa.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sản phẩm nổi bật</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong>Bình sữa và núm ti:</strong> Dòng sản phẩm cốt lõi với bình sữa Softouch, núm ti Peristaltic PLUS</li>
                <li><strong>Sản phẩm chăm sóc da em bé:</strong> Kem dưỡng ẩm, dầu massage, phấn rôm</li>
                <li><strong>Đồ dùng cho mẹ bầu:</strong> Áo ngực cho mẹ bầu, máy hút sữa</li>
                <li><strong>Phụ kiện cho em bé:</strong> Ty ngậm, cốc tập uống, đồ chơi</li>
                <li><strong>Sản phẩm vệ sinh cá nhân:</strong> Khăn ướt, tã giấy, sản phẩm tắm gội</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Nghiên cứu khoa học</h3>
              <p className="text-muted-foreground text-sm">
                Hơn 50 năm nghiên cứu về hành vi bú mẹ của trẻ sơ sinh để phát triển 
                sản phẩm tối ưu nhất.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">An toàn tuyệt đối</h3>
              <p className="text-muted-foreground text-sm">
                Tất cả sản phẩm đều được kiểm định nghiêm ngặt, đảm bảo an toàn 
                cho mẹ và bé.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Đồng hành cùng mẹ</h3>
              <p className="text-muted-foreground text-sm">
                Hỗ trợ toàn diện cho hành trình làm mẹ từ thai kỳ đến khi bé lớn.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Cam kết của Pigeon
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              "Mang đến sự an toàn, chất lượng và tình yêu thương trong từng sản phẩm 
              để hỗ trợ hành trình nuôi dạy con của các bậc phụ huynh, tạo nên những khoảnh khắc 
              hạnh phúc và đáng nhớ cho cả gia đình."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pigeon;