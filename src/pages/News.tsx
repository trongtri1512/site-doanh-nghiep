import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "IMV ra mắt chiến dịch marketing mới cho thương hiệu Astalift",
      category: "Thương hiệu",
      date: "15/01/2025",
      author: "IMV Communications",
      excerpt: "Chiến dịch 'Beauty is Science' nhằm nâng cao nhận thức về công nghệ chống lão hóa tiên tiến của Astalift từ Fujifilm.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "IMV chính thức ra mắt chiến dịch marketing toàn diện cho thương hiệu mỹ phẩm cao cấp Astalift..."
    },
    {
      id: 2,
      title: "Pigeon Vietnam mở rộng thị trường với dòng sản phẩm mới",
      category: "Sản phẩm",
      date: "12/01/2025", 
      author: "IMV Product Team",
      excerpt: "Dòng sản phẩm chăm sóc da cho mẹ bầu được phát triển đặc biệt với công nghệ từ Nhật Bản.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "Nhằm đáp ứng nhu cầu ngày càng cao của các bà mẹ Việt Nam trong việc chăm sóc sức khỏe..."
    },
    {
      id: 3,
      title: "Verites đạt top 10 thương hiệu nước hoa được yêu thích nhất",
      category: "Thành tích",
      date: "08/01/2025",
      author: "IMV Research",
      excerpt: "Khảo sát của Nielsen cho thấy Verites được đánh giá cao bởi chất lượng và mức giá phù hợp với giới trẻ.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "Theo kết quả khảo sát mới nhất của Nielsen Vietnam, thương hiệu nước hoa Verites đã lọt vào..."
    },
    {
      id: 4,
      title: "IMV tham gia triển lãm Beauty Expo Vietnam 2025",
      category: "Sự kiện",
      date: "05/01/2025",
      author: "IMV Events",
      excerpt: "Giới thiệu các sản phẩm mỹ phẩm và chăm sóc cá nhân từ các thương hiệu hàng đầu thế giới.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "IMV sẽ tham gia triển lãm Beauty Expo Vietnam 2025 với gian hàng rộng 200m2..."
    },
    {
      id: 5,
      title: "Instax Mini 12 chính thức có mặt tại thị trường Việt Nam",
      category: "Sản phẩm",
      date: "02/01/2025",
      author: "IMV Product Launch",
      excerpt: "Phiên bản mới nhất của dòng máy ảnh chụp lấy liền phổ biến với nhiều tính năng cải tiến.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "Sau thành công của các phiên bản trước, Fujifilm Instax Mini 12 chính thức được IMV đưa về..."
    },
    {
      id: 6,
      title: "Etsuko nhận giải thưởng 'Sản phẩm an toàn cho trẻ em 2024'",
      category: "Thành tích",
      date: "28/12/2024",
      author: "IMV Awards",
      excerpt: "Dòng sản phẩm sữa tắm gội cho bé được Viện Nghiên cứu Y học công nhận về độ an toàn.",
      image: "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png",
      content: "Thương hiệu Etsuko của IMV đã vinh dự nhận giải thưởng 'Sản phẩm an toàn cho trẻ em 2024'..."
    }
  ];

  const categories = ["Tất cả", "Thương hiệu", "Sản phẩm", "Thành tích", "Sự kiện"];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Tin tức & Sự kiện</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cập nhật những thông tin mới nhất về các thương hiệu, sản phẩm và hoạt động của IMV
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "Tất cả"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-3">
                    Nổi bật
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {newsArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {newsArticles[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {newsArticles[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag size={16} />
                      {newsArticles[0].category}
                    </span>
                  </div>
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Đọc thêm
                  </button>
                </div>
                <div className="hidden md:block">
                  <img
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(1).map((article) => (
              <article key={article.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </span>
                    </div>
                    <button className="text-primary hover:underline text-sm font-medium">
                      Đọc thêm
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
              Xem thêm tin tức
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mt-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Đăng ký nhận bản tin
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nhận thông tin mới nhất về các sản phẩm, thương hiệu và sự kiện của IMV
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;