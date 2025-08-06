import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, FileText } from "lucide-react";

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

export const JobApplicationForm = ({ isOpen, onClose, job }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    applicant_name: "",
    applicant_email: "",
    applicant_phone: "",
    cover_letter: ""
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      applicant_name: "",
      applicant_email: "",
      applicant_phone: "",
      cover_letter: ""
    });
    setCvFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File CV không được vượt quá 5MB");
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("File CV phải là định dạng PDF hoặc Word");
        return;
      }
      
      setCvFile(file);
    }
  };

  const uploadCV = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `cv/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!formData.applicant_name || !formData.applicant_email || !formData.cover_letter) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.applicant_email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    setIsSubmitting(true);

    try {
      let cvUrl = null;
      
      // Upload CV if provided
      if (cvFile) {
        cvUrl = await uploadCV(cvFile);
        if (!cvUrl) {
          toast.error("Lỗi khi tải lên file CV");
          setIsSubmitting(false);
          return;
        }
      }

      // Submit application
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          job_id: job.id,
          applicant_name: formData.applicant_name,
          applicant_email: formData.applicant_email,
          applicant_phone: formData.applicant_phone,
          cover_letter: formData.cover_letter,
          cv_url: cvUrl,
          status: 'pending'
        }]);

      if (error) {
        console.error('Submit error:', error);
        toast.error("Lỗi khi gửi đơn ứng tuyển");
        return;
      }

      toast.success("Đã gửi đơn ứng tuyển thành công!");
      handleClose();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Lỗi khi gửi đơn ứng tuyển");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ứng tuyển vị trí: {job.title}</DialogTitle>
          <DialogDescription>
            {job.department} - {job.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="applicant_name">Họ và tên *</Label>
              <Input
                id="applicant_name"
                value={formData.applicant_name}
                onChange={(e) => setFormData(prev => ({ ...prev, applicant_name: e.target.value }))}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <Label htmlFor="applicant_email">Email *</Label>
              <Input
                id="applicant_email"
                type="email"
                value={formData.applicant_email}
                onChange={(e) => setFormData(prev => ({ ...prev, applicant_email: e.target.value }))}
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="applicant_phone">Số điện thoại</Label>
            <Input
              id="applicant_phone"
              value={formData.applicant_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, applicant_phone: e.target.value }))}
              placeholder="0123456789"
            />
          </div>

          <div>
            <Label htmlFor="cv_upload">Tải lên CV (PDF, Word - tối đa 5MB)</Label>
            <div className="mt-2">
              <input
                id="cv_upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('cv_upload')?.click()}
                className="w-full h-20 border-dashed"
              >
                <div className="text-center">
                  {cvFile ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{cvFile.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-6 w-6" />
                      <span>Nhấn để chọn file CV</span>
                    </div>
                  )}
                </div>
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="cover_letter">Thư xin việc *</Label>
            <Textarea
              id="cover_letter"
              value={formData.cover_letter}
              onChange={(e) => setFormData(prev => ({ ...prev, cover_letter: e.target.value }))}
              placeholder="Viết thư giới thiệu bản thân, kinh nghiệm và lý do muốn ứng tuyển vị trí này..."
              rows={6}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};