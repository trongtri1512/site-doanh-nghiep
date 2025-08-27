import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign, Calendar, Users, Heart, Trophy, GraduationCap, ArrowLeft, Briefcase, Star, Building, ChevronRight, Search, Filter, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch careers content
  const { data: careersContent } = useQuery({
    queryKey: ['careers-content', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers_content')
        .select('*')
        .eq('is_active', true)
        .eq('language_code', currentLanguage)
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  // Fetch active jobs
  const { data: activeJobs } = useQuery({
    queryKey: ['active-jobs', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers_jobs')
        .select('*')
        .eq('status', 'active')
        .eq('language_code', currentLanguage)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Convert content array to object for easier access
  const content = careersContent?.reduce((acc: any, item: any) => {
    acc[item.section_key] = item;
    return acc;
  }, {}) || {};

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setIsApplicationFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsApplicationFormOpen(false);
    setSelectedJob(null);
  };

  // Filter jobs based on search and department
  const filteredJobs = activeJobs?.filter((job: any) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  }) || [];

  // Get unique departments for filter
  const departments = [...new Set(activeJobs?.map((job: any) => job.department) || [])];

  const formatJobType = (type: string) => {
    if (currentLanguage === 'en') {
      const typeMap: { [key: string]: string } = {
        'Toàn thời gian': 'Full-time',
        'Bán thời gian': 'Part-time',
        'Thực tập': 'Internship',
        'Hợp đồng': 'Contract'
      };
      return typeMap[type] || type;
    }
    return type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Hero Section with Gradient Background */}
        <section className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 py-20 mb-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {content.back_to_home?.content || "Quay lại trang chủ"}
            </Link>

            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Briefcase className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {content.hero_title?.content || "Tham gia đội ngũ của chúng tôi"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {content.hero_subtitle?.content || "Khám phá những cơ hội nghề nghiệp tuyệt vời và phát triển cùng chúng tôi"}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl">
          {/* Featured Jobs Section - Prominently placed at top */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  {content.jobs_section_title?.content || "Vị trí đang tuyển dụng"}
                </h2>
                <p className="text-muted-foreground">
                  {content.jobs_section_subtitle?.content || "Khám phá những cơ hội nghề nghiệp phù hợp với bạn"}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{filteredJobs.length} {currentLanguage === 'en' ? 'positions available' : 'vị trí đang tuyển'}</span>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/50 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={currentLanguage === 'en' ? 'Search positions, departments, or locations...' : 'Tìm kiếm vị trí, phòng ban hoặc địa điểm...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">{currentLanguage === 'en' ? 'All Departments' : 'Tất cả phòng ban'}</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid gap-6">
              {filteredJobs.map((job: any, index: number) => (
                <Card 
                  key={job.id} 
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                              {job.title}
                              {job.is_featured && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                <Building className="h-4 w-4" />
                                <span>{job.department}</span>
                              </div>
                              <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                <Clock className="h-4 w-4" />
                                <span>{formatJobType(job.job_type)}</span>
                              </div>
                              {job.salary && (
                                <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{job.salary}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className="group-hover:border-primary group-hover:text-primary transition-colors"
                        >
                          {job.department}
                        </Badge>
                        <Button 
                          onClick={() => handleApplyClick(job)}
                          className="w-full sm:w-auto group/btn hover:scale-105 transition-all duration-200"
                          size="lg"
                        >
                          {content.apply_now_button?.content || "Ứng tuyển ngay"}
                          <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {(job.description || job.requirements || job.experience) && (
                    <>
                      <Separator className="mx-6" />
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {job.description && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-primary flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                {content.job_description_label?.content || "Mô tả công việc"}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                                {job.description}
                              </p>
                            </div>
                          )}
                          
                          {job.requirements && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-primary flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                {content.job_requirements_label?.content || "Yêu cầu ứng viên"}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                                {job.requirements}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-border/50">
                          {job.experience && (
                            <div className="flex items-center gap-2 text-sm">
                              <GraduationCap className="h-4 w-4 text-primary" />
                              <span className="font-medium text-primary">
                                {content.experience_label?.content || "Kinh nghiệm:"}
                              </span>
                              <span className="text-muted-foreground">{job.experience}</span>
                            </div>
                          )}
                          
                          {job.deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-red-500" />
                              <span className="font-medium text-red-600">
                                {content.deadline_label?.content || "Hạn nộp hồ sơ:"} 
                              </span>
                              <span className="text-red-600 font-medium">
                                {new Date(job.deadline).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'vi-VN')}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </div>

            {(!activeJobs || activeJobs.length === 0) && (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-16 w-16 text-primary/50" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {content.no_jobs_title?.content || "Hiện tại chưa có vị trí tuyển dụng"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {content.no_jobs_content?.content || "Vui lòng quay lại sau để xem các cơ hội nghề nghiệp mới"}
                </p>
              </div>
            )}

            {filteredJobs.length === 0 && activeJobs && activeJobs.length > 0 && (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-32 h-32 bg-gradient-to-br from-muted/50 to-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-16 w-16 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {currentLanguage === 'en' ? 'No jobs found' : 'Không tìm thấy vị trí phù hợp'}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {currentLanguage === 'en' 
                    ? 'Try adjusting your search terms or filters' 
                    : 'Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc'}
                </p>
              </div>
            )}
          </section>

          {/* Why Join Us Section */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-4xl font-bold text-center mb-16">
              {content.why_join_title?.content || "Tại sao nên làm việc với chúng tôi?"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Users,
                  title: content.benefit_friendly_environment_title?.content || "Môi trường làm việc thân thiện",
                  content: content.benefit_friendly_environment_content?.content || "Đội ngũ đồng nghiệp hỗ trợ, môi trường làm việc tích cực và văn hóa công ty mạnh mẽ.",
                  delay: "0.1s"
                },
                {
                  icon: GraduationCap,
                  title: content.benefit_career_development_title?.content || "Phát triển nghề nghiệp",
                  content: content.benefit_career_development_content?.content || "Cơ hội đào tạo, học hỏi và thăng tiến rõ ràng trong sự nghiệp của bạn.",
                  delay: "0.2s"
                },
                {
                  icon: Trophy,
                  title: content.benefit_achievements_title?.content || "Thành tựu và thành công",
                  content: content.benefit_achievements_content?.content || "Được ghi nhận những đóng góp và thành tựu trong công việc.",
                  delay: "0.3s"
                }
              ].map((benefit, index) => (
                <Card 
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm group animate-fade-in"
                  style={{ animationDelay: benefit.delay }}
                >
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {content.why_join_content?.content && (
              <div className="text-center bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl p-8">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {content.why_join_content.content}
                </p>
              </div>
            )}
          </section>

          {/* Benefits Section */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-12 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-center mb-16">
                {content.benefits_title?.content || "Quyền lợi nhân viên"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Heart,
                    title: content.benefit_healthcare_title?.content || "Chăm sóc sức khỏe",
                    content: content.benefit_healthcare_content?.content || "Bảo hiểm y tế toàn diện, khám sức khỏe định kỳ và hỗ trợ chăm sóc sức khỏe."
                  },
                  {
                    icon: Calendar,
                    title: content.benefit_flexible_time_title?.content || "Thời gian linh hoạt",
                    content: content.benefit_flexible_time_content?.content || "Chế độ làm việc linh hoạt, nghỉ phép hợp lý và cân bằng cuộc sống."
                  },
                  {
                    icon: DollarSign,
                    title: content.benefit_attractive_salary_title?.content || "Lương thưởng hấp dẫn",
                    content: content.benefit_attractive_salary_content?.content || "Mức lương cạnh tranh, thưởng hiệu suất và các phúc lợi bổ sung."
                  },
                  {
                    icon: Trophy,
                    title: content.benefit_skill_development_title?.content || "Phát triển kỹ năng",
                    content: content.benefit_skill_development_content?.content || "Các khóa đào tạo chuyên môn, hội thảo và cơ hội học tập liên tục."
                  }
                ].map((benefit, index) => (
                  <Card 
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm group"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <benefit.icon className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {content.benefits_content?.content && (
                <div className="mt-12 text-center">
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    {content.benefits_content.content}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-semibold mb-4">
                    {content.contact_section_title?.content || "Không tìm thấy vị trí phù hợp?"}
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    {content.contact_section_content?.content || "Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp với năng lực và kinh nghiệm của bạn."}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-semibold text-primary">
                        {content.contact_email_label?.content || "Email:"}
                      </span>
                      <span className="ml-2">{content.contact_email_value?.content || "careers@imv.com.vn"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-semibold text-primary">
                        {content.contact_hotline_label?.content || "Hotline:"}
                      </span>
                      <span className="ml-2">{content.contact_hotline_value?.content || "1900-xxxx"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />

      {/* Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          isOpen={isApplicationFormOpen}
          onClose={handleCloseForm}
          job={selectedJob}
        />
      )}
    </div>
  );
};

export default Careers;