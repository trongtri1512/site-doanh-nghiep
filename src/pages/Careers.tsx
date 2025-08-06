import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, Clock, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Nhân viên Kinh doanh",
      department: "Kinh doanh",
      location: "Hồ Chí Minh",
      type: "Toàn thời gian",
      description: "Tìm kiếm và phát triển khách hàng mới, duy trì mối quan hệ với khách hàng hiện tại.",
      requirements: [
        "Tốt nghiệp Đại học chuyên ngành Kinh tế, Kinh doanh",
        "Có kinh nghiệm 1-2 năm trong lĩnh vực bán hàng",
        "Kỹ năng giao tiếp tốt, khả năng thuyết phục",
        "Có tinh thần trách nhiệm cao"
      ]
    },
    {
      id: 2,
      title: "Chuyên viên Marketing",
      department: "Marketing",
      location: "Hà Nội",
      type: "Toàn thời gian", 
      description: "Xây dựng và thực hiện các chiến lược marketing cho các thương hiệu của công ty.",
      requirements: [
        "Tốt nghiệp Đại học chuyên ngành Marketing, Truyền thông",
        "Có kinh nghiệm 2-3 năm trong lĩnh vực marketing",
        "Thành thạo các công cụ marketing digital",
        "Có khả năng sáng tạo và tư duy phân tích"
      ]
    },
    {
      id: 3,
      title: "Thực tập sinh Nhân sự",
      department: "Nhân sự",
      location: "Hồ Chí Minh",
      type: "Thực tập",
      description: "Hỗ trợ các hoạt động tuyển dụng, đào tạo và phát triển nhân sự.",
      requirements: [
        "Sinh viên năm 3, 4 chuyên ngành Quản trị nhân lực",
        "Có thể làm việc ít nhất 3 tháng",
        "Kỹ năng giao tiếp tốt",
        "Có trách nhiệm và nhiệt tình trong công việc"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Cơ hội nghề nghiệp</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tham gia cùng IMV để xây dựng sự nghiệp trong môi trường năng động, 
              chuyên nghiệp và đầy thử thách với những thương hiệu hàng đầu thế giới.
            </p>
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Tại sao chọn IMV?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <Users className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Môi trường làm việc tuyệt vời</h3>
                    <p className="text-muted-foreground text-sm">
                      Văn hóa doanh nghiệp năng động, đồng nghiệp thân thiện và hỗ trợ lẫn nhau.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cơ hội phát triển</h3>
                    <p className="text-muted-foreground text-sm">
                      Đào tạo chuyên nghiệp, lộ trình thăng tiến rõ ràng và cơ hội làm việc quốc tế.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Chế độ đãi ngộ hấp dẫn</h3>
                    <p className="text-muted-foreground text-sm">
                      Lương thưởng cạnh tranh, bảo hiểm đầy đủ và nhiều phúc lợi khác.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Openings */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Vị trí đang tuyển dụng
            </h2>
            <div className="grid gap-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase size={16} />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                    </div>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      Ứng tuyển
                    </button>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Yêu cầu:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Không tìm thấy vị trí phù hợp?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp 
              với năng lực và kinh nghiệm của bạn.
            </p>
            <div className="space-y-2">
              <p className="text-foreground">
                <strong>Email:</strong> careers@imv.com.vn
              </p>
              <p className="text-foreground">
                <strong>Hotline:</strong> 1900-xxxx
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;