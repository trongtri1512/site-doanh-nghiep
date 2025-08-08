import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign, Calendar, Users, Heart, Trophy, GraduationCap, ArrowLeft } from "lucide-react";
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
  const { currentLanguage, t } = useLanguage();

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

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          {content.back_to_home?.content || "Quay lại trang chủ"}
        </Link>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              {content.hero_title?.content || "Tham gia đội ngũ của chúng tôi"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.hero_subtitle?.content || "Khám phá những cơ hội nghề nghiệp tuyệt vời và phát triển cùng chúng tôi"}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          {/* Why Join Us Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-16">
              {content.why_join_title?.content || "Tại sao nên làm việc với chúng tôi?"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{content.benefit_friendly_environment_title?.content || "Môi trường làm việc thân thiện"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_friendly_environment_content?.content || "Đội ngũ đồng nghiệp hỗ trợ, môi trường làm việc tích cực và văn hóa công ty mạnh mẽ."}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{content.benefit_career_development_title?.content || "Phát triển nghề nghiệp"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_career_development_content?.content || "Cơ hội đào tạo, học hỏi và thăng tiến rõ ràng trong sự nghiệp của bạn."}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{content.benefit_achievements_title?.content || "Thành tựu và thành công"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_achievements_content?.content || "Được ghi nhận những đóng góp và thành tựu trong công việc."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {content.why_join_content?.content && (
              <div className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.why_join_content.content}
                </p>
              </div>
            )}
          </section>

          {/* Benefits Section */}
          <section className="mb-20 bg-muted/30 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-center mb-16">
              {content.benefits_title?.content || "Quyền lợi nhân viên"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{content.benefit_healthcare_title?.content || "Chăm sóc sức khỏe"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_healthcare_content?.content || "Bảo hiểm y tế toàn diện, khám sức khỏe định kỳ và hỗ trợ chăm sóc sức khỏe."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{content.benefit_flexible_time_title?.content || "Thời gian linh hoạt"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_flexible_time_content?.content || "Chế độ làm việc linh hoạt, nghỉ phép hợp lý và cân bằng cuộc sống."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{content.benefit_attractive_salary_title?.content || "Lương thưởng hấp dẫn"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_attractive_salary_content?.content || "Mức lương cạnh tranh, thưởng hiệu suất và các phúc lợi bổ sung."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{content.benefit_skill_development_title?.content || "Phát triển kỹ năng"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {content.benefit_skill_development_content?.content || "Các khóa đào tạo chuyên môn, hội thảo và cơ hội học tập liên tục."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {content.benefits_content?.content && (
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.benefits_content.content}
                </p>
              </div>
            )}
          </section>

          {/* Job Listings Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {content.jobs_section_title?.content || "Vị trí đang tuyển dụng"}
              </h2>
              <p className="text-xl text-muted-foreground">
                {content.jobs_section_subtitle?.content || "Khám phá những cơ hội nghề nghiệp phù hợp với bạn"}
              </p>
            </div>

            <div className="space-y-6">
              {activeJobs?.map((job: any) => (
                <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.job_type}</span>
                          </div>
                          {job.salary && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge variant="outline">{job.department}</Badge>
                        <Button 
                          onClick={() => handleApplyClick(job)}
                          className="w-full sm:w-auto"
                        >
                          {content.apply_now_button?.content || "Ứng tuyển ngay"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {(job.description || job.requirements || job.experience) && (
                    <>
                      <Separator />
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {job.description && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                {content.job_description_label?.content || "Mô tả công việc"}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {job.description}
                              </p>
                            </div>
                          )}
                          
                          {job.requirements && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                {content.job_requirements_label?.content || "Yêu cầu ứng viên"}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {job.requirements}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {job.experience && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="font-semibold">
                                {content.experience_label?.content || "Kinh nghiệm:"}
                              </span>
                              <span className="text-muted-foreground">{job.experience}</span>
                            </div>
                          </div>
                        )}
                        
                        {job.deadline && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-2 text-sm text-red-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {content.deadline_label?.content || "Hạn nộp hồ sơ:"} {new Date(job.deadline).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'vi-VN')}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </div>

            {(!activeJobs || activeJobs.length === 0) && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {content.no_jobs_title?.content || "Hiện tại chưa có vị trí tuyển dụng"}
                </h3>
                <p className="text-muted-foreground">
                  {content.no_jobs_content?.content || "Vui lòng quay lại sau để xem các cơ hội nghề nghiệp mới"}
                </p>
              </div>
            )}
          </section>

          {/* Contact Section */}
          <section className="bg-muted/50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              {content.contact_section_title?.content || "Không tìm thấy vị trí phù hợp?"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {content.contact_section_content?.content || "Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp với năng lực và kinh nghiệm của bạn."}
            </p>
            <div className="space-y-2">
              <p>
                <strong>{content.contact_email_label?.content || "Email:"}</strong> {content.contact_email_value?.content || "careers@imv.com.vn"}
              </p>
              <p>
                <strong>{content.contact_hotline_label?.content || "Hotline:"}</strong> {content.contact_hotline_value?.content || "1900-xxxx"}
              </p>
            </div>
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