import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, MapPin, Clock, DollarSign, Save, Mail, Phone, FileText, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CareersManagement = () => {
  const [activeTab, setActiveTab] = useState("vi");
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [jobFormData, setJobFormData] = useState({
    title: "", department: "", location: "", job_type: "", salary: "",
    experience: "", description: "", requirements: "", benefits: "", deadline: "", status: "active"
  });
  const [contentData, setContentData] = useState<any>({});
  const queryClient = useQueryClient();

  // Fetch careers content
  const { data: careersContent, isLoading: contentLoading } = useQuery({
    queryKey: ['careers-content', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers_content')
        .select('*')
        .eq('language_code', activeTab)
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  // Fetch careers jobs
  const { data: careersJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['careers-jobs', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers_jobs')
        .select('*')
        .eq('language_code', activeTab)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch job applications
  const { data: jobApplications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['job-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          careers_jobs (
            title,
            department,
            location
          )
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Initialize content data when loaded
  useEffect(() => {
    if (careersContent) {
      const contentObj: any = {};
      careersContent.forEach((item: any) => {
        contentObj[item.section_key] = {
          title: item.title || '',
          content: item.content || ''
        };
      });
      setContentData(contentObj);
    }
  }, [careersContent]);

  const departments = [
    "Kinh doanh",
    "Marketing", 
    "Logistics",
    "Nhân sự",
    "Kế toán",
    "IT",
    "Khác"
  ];

  const jobTypes = [
    "Toàn thời gian",
    "Bán thời gian",
    "Thực tập",
    "Hợp đồng"
  ];

  const statuses = [
    { value: "active", label: "Đang tuyển", variant: "default" },
    { value: "paused", label: "Tạm dừng", variant: "secondary" },
    { value: "closed", label: "Đã đóng", variant: "outline" }
  ];

  const applicationStatuses = [
    { value: "pending", label: "Chưa xem", variant: "secondary" },
    { value: "reviewing", label: "Đang xem", variant: "default" },
    { value: "accepted", label: "Trúng tuyển", variant: "default" },
    { value: "rejected", label: "Rớt", variant: "destructive" }
  ];

  const locations = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Bình Dương",
    "Đồng Nai",
    "Toàn quốc"
  ];

  // Mutations for content
  const updateContentMutation = useMutation({
    mutationFn: async (updates: any) => {
      const promises = Object.entries(updates).map(async ([section_key, data]: [string, any]) => {
        const { error } = await supabase
          .from('careers_content')
        .update({
          title: data.title,
          content: data.content
        })
          .eq('section_key', section_key)
          .eq('language_code', activeTab);
        if (error) throw error;
      });
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers-content'] });
      toast.success("Đã cập nhật nội dung trang");
    },
    onError: () => toast.error("Lỗi khi cập nhật nội dung")
  });

  // Mutations for jobs
  const createJobMutation = useMutation({
    mutationFn: async (jobData: any) => {
      const { error } = await supabase
        .from('careers_jobs')
        .insert([jobData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers-jobs'] });
      toast.success("Đã thêm vị trí tuyển dụng mới");
      setIsJobDialogOpen(false);
      resetJobForm();
    },
    onError: () => toast.error("Lỗi khi thêm vị trí tuyển dụng")
  });

  const updateJobMutation = useMutation({
    mutationFn: async ({ id, ...jobData }: any) => {
      const { error } = await supabase
        .from('careers_jobs')
        .update(jobData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers-jobs'] });
      toast.success("Đã cập nhật vị trí tuyển dụng");
      setIsJobDialogOpen(false);
      resetJobForm();
    },
    onError: () => toast.error("Lỗi khi cập nhật vị trí tuyển dụng")
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('careers_jobs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers-jobs'] });
      toast.success("Đã xóa vị trí tuyển dụng");
    },
    onError: () => toast.error("Lỗi khi xóa vị trí tuyển dụng")
  });

  // Update application status mutation
  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast.success("Đã cập nhật trạng thái đơn ứng tuyển");
    },
    onError: () => toast.error("Lỗi khi cập nhật trạng thái")
  });

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      job_type: job.job_type,
      salary: job.salary || "",
      experience: job.experience || "",
      description: job.description || "",
      requirements: job.requirements || "",
      benefits: job.benefits || "",
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : "",
      status: job.status
    });
    setIsJobDialogOpen(true);
  };

  const resetJobForm = () => {
    setEditingJob(null);
    setJobFormData({
      title: "", department: "", location: "", job_type: "", salary: "",
      experience: "", description: "", requirements: "", benefits: "", deadline: "", status: "active"
    });
  };

  const handleJobSubmit = () => {
    if (!jobFormData.title || !jobFormData.department || !jobFormData.location || !jobFormData.job_type) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const submitData = {
      ...jobFormData,
      deadline: jobFormData.deadline ? new Date(jobFormData.deadline).toISOString() : null,
      language_code: activeTab
    };

    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, ...submitData });
    } else {
      createJobMutation.mutate(submitData);
    }
  };

  const updateJobStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('careers_jobs')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['careers-jobs'] });
      toast.success("Đã cập nhật trạng thái");
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  const handleContentChange = (section: string, field: string, value: string) => {
    setContentData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveContent = () => {
    updateContentMutation.mutate(contentData);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statuses.find(s => s.value === status);
    return (
      <Badge variant={statusConfig?.variant as any}>
        {statusConfig?.label}
      </Badge>
    );
  };

  const getApplicationStatusBadge = (status: string) => {
    const statusConfig = applicationStatuses.find(s => s.value === status);
    return (
      <Badge variant={statusConfig?.variant as any}>
        {statusConfig?.label}
      </Badge>
    );
  };

  const handleDownloadCV = (cvUrl: string, applicantName: string) => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `CV_${applicantName.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (contentLoading || jobsLoading || applicationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý Nghề nghiệp</h1>
        <p className="text-muted-foreground">Quản lý nội dung trang và thông tin tuyển dụng</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 w-fit">
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6 mt-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="content">Quản lý trang</TabsTrigger>
              <TabsTrigger value="jobs">Quản lý tuyển dụng</TabsTrigger>
              <TabsTrigger value="applications">Danh sách ứng tuyển</TabsTrigger>
            </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Nội dung trang Nghề nghiệp</CardTitle>
                  <CardDescription>Chỉnh sửa nội dung hiển thị trên trang tuyển dụng</CardDescription>
                </div>
                <Button onClick={handleSaveContent} disabled={updateContentMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {updateContentMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Phần Hero</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Tiêu đề chính</Label>
                    <Input
                      value={contentData.hero_title?.title || ''}
                      onChange={(e) => handleContentChange('hero_title', 'title', e.target.value)}
                      placeholder="Tiêu đề trang tuyển dụng"
                    />
                  </div>
                  <div>
                    <Label>Phụ đề</Label>
                    <Input
                      value={contentData.hero_subtitle?.content || ''}
                      onChange={(e) => handleContentChange('hero_subtitle', 'content', e.target.value)}
                      placeholder="Mô tả ngắn về trang tuyển dụng"
                    />
                  </div>
                </div>
              </div>

              {/* Why Join Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tại sao nên làm việc với chúng tôi</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Tiêu đề</Label>
                    <Input
                      value={contentData.why_join_title?.content || ''}
                      onChange={(e) => handleContentChange('why_join_title', 'content', e.target.value)}
                      placeholder="Tại sao nên làm việc với chúng tôi"
                    />
                  </div>
                  <div>
                    <Label>Nội dung</Label>
                    <Textarea
                      value={contentData.why_join_content?.content || ''}
                      onChange={(e) => handleContentChange('why_join_content', 'content', e.target.value)}
                      placeholder="Mô tả về môi trường làm việc, văn hóa công ty..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quyền lợi nhân viên</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Tiêu đề</Label>
                    <Input
                      value={contentData.benefits_title?.content || ''}
                      onChange={(e) => handleContentChange('benefits_title', 'content', e.target.value)}
                      placeholder="Quyền lợi nhân viên"
                    />
                  </div>
                  <div>
                    <Label>Nội dung</Label>
                    <Textarea
                      value={contentData.benefits_content?.content || ''}
                      onChange={(e) => handleContentChange('benefits_content', 'content', e.target.value)}
                      placeholder="Các quyền lợi, chế độ đãi ngộ dành cho nhân viên..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Danh sách tuyển dụng</h2>
              <p className="text-muted-foreground">Quản lý các vị trí đang tuyển dụng</p>
            </div>
            <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetJobForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm vị trí tuyển dụng
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingJob ? "Chỉnh sửa vị trí tuyển dụng" : "Thêm vị trí tuyển dụng mới"}
                  </DialogTitle>
                  <DialogDescription>
                    Tạo hoặc chỉnh sửa thông tin tuyển dụng
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="job-title">Tên vị trí *</Label>
                      <Input
                        id="job-title"
                        value={jobFormData.title}
                        onChange={(e) => setJobFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Nhập tên vị trí tuyển dụng"
                      />
                    </div>
                    <div>
                      <Label htmlFor="job-department">Phòng ban *</Label>
                      <Select value={jobFormData.department} onValueChange={(value) => setJobFormData(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phòng ban" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="job-location">Địa điểm *</Label>
                      <Select value={jobFormData.location} onValueChange={(value) => setJobFormData(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="job-type">Loại hình *</Label>
                      <Select value={jobFormData.job_type} onValueChange={(value) => setJobFormData(prev => ({ ...prev, job_type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại hình" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="job-salary">Mức lương</Label>
                      <Input
                        id="job-salary"
                        value={jobFormData.salary}
                        onChange={(e) => setJobFormData(prev => ({ ...prev, salary: e.target.value }))}
                        placeholder="15-20 triệu"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="job-experience">Kinh nghiệm</Label>
                      <Input
                        id="job-experience"
                        value={jobFormData.experience}
                        onChange={(e) => setJobFormData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="2-3 năm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="job-deadline">Hạn nộp hồ sơ</Label>
                      <Input
                        id="job-deadline"
                        type="date"
                        value={jobFormData.deadline}
                        onChange={(e) => setJobFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="job-status">Trạng thái</Label>
                      <Select value={jobFormData.status} onValueChange={(value) => setJobFormData(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="job-description">Mô tả công việc</Label>
                    <Textarea
                      id="job-description"
                      value={jobFormData.description}
                      onChange={(e) => setJobFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Mô tả chi tiết về công việc"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="job-requirements">Yêu cầu ứng viên</Label>
                    <Textarea
                      id="job-requirements"
                      value={jobFormData.requirements}
                      onChange={(e) => setJobFormData(prev => ({ ...prev, requirements: e.target.value }))}
                      placeholder="Các yêu cầu về kinh nghiệm, kỹ năng..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="job-benefits">Quyền lợi</Label>
                    <Textarea
                      id="job-benefits"
                      value={jobFormData.benefits}
                      onChange={(e) => setJobFormData(prev => ({ ...prev, benefits: e.target.value }))}
                      placeholder="Các quyền lợi và chế độ đãi ngộ"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsJobDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleJobSubmit} disabled={createJobMutation.isPending || updateJobMutation.isPending}>
                    {editingJob ? "Cập nhật" : "Thêm"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Danh sách vị trí tuyển dụng</CardTitle>
              <CardDescription>
                Quản lý tất cả vị trí đang tuyển dụng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead>Địa điểm</TableHead>
                    <TableHead>Loại hình</TableHead>
                    <TableHead>Mức lương</TableHead>
                    <TableHead>Hạn nộp</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {careersJobs?.map((job: any) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        <div>{job.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Kinh nghiệm: {job.experience || 'Không yêu cầu'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{job.job_type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{job.salary || 'Thỏa thuận'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : '-'}
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={job.status} 
                          onValueChange={(value) => updateJobStatus(job.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/careers/${job.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteJobMutation.mutate(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Danh sách ứng tuyển</h2>
            <p className="text-muted-foreground">Quản lý các đơn ứng tuyển từ ứng viên</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Đơn ứng tuyển</CardTitle>
              <CardDescription>
                Xem và quản lý tất cả đơn ứng tuyển
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ứng viên</TableHead>
                    <TableHead>Vị trí ứng tuyển</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead>Địa điểm</TableHead>
                    <TableHead>Ngày ứng tuyển</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications?.map((application: any) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{application.applicant_name}</div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{application.applicant_email}</span>
                          </div>
                          {application.applicant_phone && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{application.applicant_phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{application.careers_jobs?.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{application.careers_jobs?.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{application.careers_jobs?.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(application.created_at).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={application.status} 
                          onValueChange={(value) => updateApplicationStatusMutation.mutate({ id: application.id, status: value })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {applicationStatuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {application.cv_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadCV(application.cv_url, application.applicant_name)}
                              title="Tải CV"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" title="Xem chi tiết">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Chi tiết đơn ứng tuyển</DialogTitle>
                                <DialogDescription>
                                  Thông tin ứng viên: {application.applicant_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Vị trí ứng tuyển</Label>
                                  <div className="mt-1 font-medium">{application.careers_jobs?.title}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Phòng ban</Label>
                                    <div className="mt-1">{application.careers_jobs?.department}</div>
                                  </div>
                                  <div>
                                    <Label>Địa điểm</Label>
                                    <div className="mt-1">{application.careers_jobs?.location}</div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Email</Label>
                                    <div className="mt-1">{application.applicant_email}</div>
                                  </div>
                                  <div>
                                    <Label>Số điện thoại</Label>
                                    <div className="mt-1">{application.applicant_phone || 'Không có'}</div>
                                  </div>
                                </div>
                                <div>
                                  <Label>Thư xin việc</Label>
                                  <div className="mt-1 p-3 bg-muted rounded-md">
                                    {application.cover_letter}
                                  </div>
                                </div>
                                <div>
                                  <Label>Trạng thái</Label>
                                  <div className="mt-1">
                                    {getApplicationStatusBadge(application.status)}
                                  </div>
                                </div>
                                {application.cv_url && (
                                  <div>
                                    <Label>CV</Label>
                                    <div className="mt-1">
                                      <Button
                                        variant="outline"
                                        onClick={() => handleDownloadCV(application.cv_url, application.applicant_name)}
                                        className="w-full"
                                      >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Tải xuống CV
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {(!jobApplications || jobApplications.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có đơn ứng tuyển nào
                </div>
              )}
            </CardContent>
          </Card>
          </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareersManagement;