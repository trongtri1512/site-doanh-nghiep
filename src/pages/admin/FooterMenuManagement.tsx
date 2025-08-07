import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Save, X, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

interface FooterMenuItem {
  id: string;
  section_id: string;
  title: string;
  url: string;
  target: string;
  display_order: number;
  is_active: boolean;
  language_code: string;
  footer_sections?: FooterSection;
}

const FooterMenuManagement = () => {
  const [menuItems, setMenuItems] = useState<FooterMenuItem[]>([]);
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<FooterMenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();

  const [formData, setFormData] = useState({
    section_id: "",
    title: "",
    url: "",
    target: "_self",
    display_order: 0,
    is_active: true,
    language_code: currentLanguage,
  });

  useEffect(() => {
    fetchData();
  }, [currentLanguage]);

  const fetchData = async () => {
    try {
      // Fetch footer sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("footer_sections")
        .select("id, section_type, title")
        .eq("is_active", true)
        .eq("language_code", currentLanguage)
        .order("display_order", { ascending: true });

      if (sectionsError) throw sectionsError;
      setSections(sectionsData || []);

      // Fetch menu items with section information
      const { data: menuData, error: menuError } = await supabase
        .from("footer_menu_items")
        .select(`
          *,
          footer_sections (
            id,
            section_type,
            title
          )
        `)
        .eq("language_code", currentLanguage)
        .order("section_id", { ascending: true })
        .order("display_order", { ascending: true });

      if (menuError) throw menuError;
      setMenuItems(menuData || []);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu menu footer",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...formData,
        language_code: currentLanguage,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("footer_menu_items")
          .update(submissionData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({
          title: "Thành công",
          description: "Cập nhật menu item thành công",
        });
      } else {
        const { error } = await supabase
          .from("footer_menu_items")
          .insert([submissionData]);

        if (error) throw error;
        toast({
          title: "Thành công",
          description: "Tạo menu item mới thành công",
        });
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu menu item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: FooterMenuItem) => {
    setEditingItem(item);
    setFormData({
      section_id: item.section_id,
      title: item.title,
      url: item.url,
      target: item.target,
      display_order: item.display_order,
      is_active: item.is_active,
      language_code: item.language_code,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa menu item này?")) return;

    try {
      const { error } = await supabase
        .from("footer_menu_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Thành công",
        description: "Xóa menu item thành công",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa menu item",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      section_id: "",
      title: "",
      url: "",
      target: "_self",
      display_order: 0,
      is_active: true,
      language_code: currentLanguage,
    });
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const sectionTitle = item.footer_sections?.title || 'Không có section';
    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(item);
    return acc;
  }, {} as Record<string, FooterMenuItem[]>);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Quản lý Menu Footer</h1>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <Select value={currentLanguage} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.native_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Chỉnh sửa Menu Item" : "Thêm Menu Item mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="section_id">Footer Section</Label>
                <Select
                  value={formData.section_id}
                  onValueChange={(value) => setFormData({...formData, section_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.title} ({section.section_type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Tên menu item"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Thứ tự</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="/about, https://example.com..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="target">Target</Label>
                <Select
                  value={formData.target}
                  onValueChange={(value) => setFormData({...formData, target: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Cùng tab (_self)</SelectItem>
                    <SelectItem value="_blank">Tab mới (_blank)</SelectItem>
                  </SelectContent>
                </Select>
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
                  {editingItem ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedMenuItems).map(([sectionTitle, items]) => (
          <Card key={sectionTitle}>
            <CardHeader>
              <CardTitle>{sectionTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Thứ tự</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell className="font-mono text-sm">{item.url}</TableCell>
                      <TableCell>{item.target}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.is_active 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {item.is_active ? "Kích hoạt" : "Vô hiệu"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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
        ))}
      </div>
    </div>
  );
};

export default FooterMenuManagement;