import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, MapPin, Clock, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CareersManagement = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Nhân viên Kinh doanh",
      department: "Kinh doanh",
      location: "TP. Hồ Chí Minh",
      type: "Toàn thời gian",
      salary: "15-20 triệu",
      experience: "2-3 năm",
      description: "Phát triển và duy trì mối quan hệ với khách hàng...",
      requirements: "- Tốt nghiệp Đại học chuyên ngành liên quan\n- Kinh nghiệm 2-3 năm trong lĩnh vực kinh doanh",
      benefits: "- Lương cạnh tranh + thưởng\n- Bảo hiểm đầy đủ\n- Môi trường làm việc chuyên nghiệp",
      postedDate: "2024-01-15",
      deadline: "2024-02-15",
      status: "active"
    },
    {
      id: 2,
      title: "Marketing Executive",
      department: "Marketing",
      location: "Hà Nội",
      type: "Toàn thời gian",
      salary: "12-18 triệu", 
      experience: "1-2 năm",
      description: "Phụ trách các hoạt động marketing và truyền thông...",
      requirements: "- Tốt nghiệp chuyên ngành Marketing, Communications\n- Kinh nghiệm 1-2 năm",
      benefits: "- Mức lương hấp dẫn\n- Đào tạo chuyên sâu\n- Cơ hội thăng tiến",
      postedDate: "2024-01-10",
      deadline: "2024-02-10",
      status: "active"
    },
    {
      id: 3,
      title: "Nhân viên Kho vận",
      department: "Logistics",
      location: "Bình Dương",
      type: "Toàn thời gian",
      salary: "8-12 triệu",
      experience: "Không yêu cầu",
      description: "Quản lý hàng hóa và các hoạt động kho vận...",
      requirements: "- Tốt nghiệp THPT trở lên\n- Không yêu cầu kinh nghiệm",
      benefits: "- Lương ổn định\n- Chế độ phúc lợi tốt\n- Đào tạo từ đầu",
      postedDate: "2024-01-08",
      deadline: "2024-02-08",
      status: "paused"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

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

  const locations = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Bình Dương",
    "Đồng Nai",
    "Toàn quốc"
  ];

  const handleEdit = (job: any) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const updateStatus = (id: number, newStatus: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statuses.find(s => s.value === status);
    return (
      <Badge variant={statusConfig?.variant as any}>
        {statusConfig?.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Nghề nghiệp</h1>
          <p className="text-muted-foreground">Đăng tải và quản lý thông tin tuyển dụng</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingJob(null)}>
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
                  <Label htmlFor="job-title">Tên vị trí</Label>
                  <Input
                    id="job-title"
                    defaultValue={editingJob?.title || ""}
                    placeholder="Nhập tên vị trí tuyển dụng"
                  />
                </div>
                <div>
                  <Label htmlFor="job-department">Phòng ban</Label>
                  <Select defaultValue={editingJob?.department || ""}>
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
                  <Label htmlFor="job-location">Địa điểm</Label>
                  <Select defaultValue={editingJob?.location || ""}>
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
                  <Label htmlFor="job-type">Loại hình</Label>
                  <Select defaultValue={editingJob?.type || ""}>
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
                    defaultValue={editingJob?.salary || ""}
                    placeholder="15-20 triệu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="job-experience">Kinh nghiệm</Label>
                  <Input
                    id="job-experience"
                    defaultValue={editingJob?.experience || ""}
                    placeholder="2-3 năm"
                  />
                </div>
                <div>
                  <Label htmlFor="job-deadline">Hạn nộp hồ sơ</Label>
                  <Input
                    id="job-deadline"
                    type="date"
                    defaultValue={editingJob?.deadline || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="job-status">Trạng thái</Label>
                  <Select defaultValue={editingJob?.status || "active"}>
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
                  defaultValue={editingJob?.description || ""}
                  placeholder="Mô tả chi tiết về công việc"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="job-requirements">Yêu cầu ứng viên</Label>
                <Textarea
                  id="job-requirements"
                  defaultValue={editingJob?.requirements || ""}
                  placeholder="Các yêu cầu về kinh nghiệm, kỹ năng..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="job-benefits">Quyền lợi</Label>
                <Textarea
                  id="job-benefits"
                  defaultValue={editingJob?.benefits || ""}
                  placeholder="Các quyền lợi và chế độ đãi ngộ"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
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
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    <div>{job.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Kinh nghiệm: {job.experience}
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
                      <span>{job.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{job.salary}</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.deadline}</TableCell>
                  <TableCell>
                    <Select 
                      value={job.status} 
                      onValueChange={(value) => updateStatus(job.id, value)}
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
                        onClick={() => handleEdit(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(job.id)}
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
    </div>
  );
};

export default CareersManagement;