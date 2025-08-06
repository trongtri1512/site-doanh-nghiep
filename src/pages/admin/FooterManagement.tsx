import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FooterSection {
  id: string;
  section_type: string;
  title: string;
  content: any;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const FooterManagement = () => {
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<FooterSection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    section_type: "",
    title: "",
    content: "{}",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchFooterSections();
  }, []);

  const fetchFooterSections = async () => {
    try {
      const { data, error } = await supabase
        .from("footer_sections")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu footer",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let content;
      try {
        content = JSON.parse(formData.content);
      } catch {
        toast({
          title: "Lỗi",
          description: "JSON content không hợp lệ",
          variant: "destructive",
        });
        return;
      }

      const sectionData = {
        ...formData,
        content,
      };

      if (editingSection) {
        const { error } = await supabase
          .from("footer_sections")
          .update(sectionData)
          .eq("id", editingSection.id);

        if (error) throw error;
        toast({
          title: "Thành công",
          description: "Cập nhật section footer thành công",
        });
      } else {
        const { error } = await supabase
          .from("footer_sections")
          .insert([sectionData]);

        if (error) throw error;
        toast({
          title: "Thành công",
          description: "Tạo section footer mới thành công",
        });
      }

      setIsDialogOpen(false);
      setEditingSection(null);
      resetForm();
      fetchFooterSections();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu footer section",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (section: FooterSection) => {
    setEditingSection(section);
    setFormData({
      section_type: section.section_type,
      title: section.title || "",
      content: JSON.stringify(section.content, null, 2),
      display_order: section.display_order,
      is_active: section.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa section này?")) return;

    try {
      const { error } = await supabase
        .from("footer_sections")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Thành công",
        description: "Xóa section footer thành công",
      });
      fetchFooterSections();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa footer section",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      section_type: "",
      title: "",
      content: "{}",
      display_order: 0,
      is_active: true,
    });
  };

  const handleCreateNew = () => {
    setEditingSection(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Footer</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSection ? "Chỉnh sửa Section" : "Thêm Section mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="section_type">Loại Section</Label>
                  <Input
                    id="section_type"
                    value={formData.section_type}
                    onChange={(e) => setFormData({...formData, section_type: e.target.value})}
                    placeholder="company_info, quick_links, contact..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Thứ tự hiển thị</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Tiêu đề section"
                />
              </div>

              <div>
                <Label htmlFor="content">Nội dung (JSON)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder='{"description": "...", "logo_url": "...", "address": "..."}'
                  className="h-32 font-mono text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">Kích hoạt</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingSection ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Footer Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell className="font-medium">{section.section_type}</TableCell>
                  <TableCell>{section.title}</TableCell>
                  <TableCell>{section.display_order}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      section.is_active 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {section.is_active ? "Kích hoạt" : "Vô hiệu"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(section)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(section.id)}
                        className="text-red-600"
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

export default FooterManagement;