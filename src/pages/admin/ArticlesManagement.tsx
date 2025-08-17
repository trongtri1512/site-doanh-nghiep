import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Plus, Edit, Trash2, Eye, Star, StarOff, Upload } from "lucide-react";
import { format } from "date-fns";
import TinyMCEEditor from "@/components/admin/TinyMCEEditor";
import CategorySelector from "@/components/admin/CategorySelector";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  status: string;
  featured: boolean;
  category: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  language_code: string;
  profiles?: {
    display_name: string;
  };
}

const ArticlesManagement = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState("vi");
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    status: "draft",
    featured: false,
    language_code: "vi"
  });

  useEffect(() => {
    loadArticles();
  }, [activeTab]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('language_code', activeTab)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bài viết",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image_url: "",
      category: "",
      status: "draft",
      featured: false,
      language_code: activeTab
    });
    setEditingArticle(null);
  };

  const handleEdit = (article: Article) => {
    navigate(`/admin/articles/edit/${article.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa bài viết"
      });
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa bài viết",
        variant: "destructive"
      });
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ featured: !currentFeatured })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: currentFeatured ? "Đã bỏ nổi bật" : "Đã đặt nổi bật"
      });
      loadArticles();
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái nổi bật",
        variant: "destructive"
      });
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('news')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: `Đã cập nhật trạng thái: ${newStatus}`
      });
      loadArticles();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái",
        variant: "destructive"
      });
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      toast({
        title: "Thành công",
        description: "Upload hình ảnh thành công"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể upload hình ảnh",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (status: string) => {
    if (!formData.title.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề bài viết",
        variant: "destructive"
      });
      return;
    }

    if (!formData.slug.trim()) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
    }

    try {
      const articleData = {
        ...formData,
        status,
        author: user?.email || 'admin',
        language_code: activeTab,
        published_at: status === 'published' ? new Date().toISOString() : null
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('news')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news')
          .insert([articleData]);

        if (error) throw error;
      }

      toast({
        title: "Thành công",
        description: editingArticle ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới"
      });

      setDialogOpen(false);
      resetForm();
      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu bài viết",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Đã xuất bản", variant: "default" as const },
      draft: { label: "Bản nháp", variant: "secondary" as const },
      scheduled: { label: "Đã lên lịch", variant: "outline" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý bài viết</h1>
        <Button onClick={() => navigate('/admin/articles/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm bài viết
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách bài viết ({activeTab === 'vi' ? 'Tiếng Việt' : 'English'})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hình ảnh</TableHead>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Chuyên mục</TableHead>
                      <TableHead>Tác giả</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Nổi bật</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          {article.image_url && (
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="h-12 w-16 object-cover rounded"
                            />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <Select
                            value={article.status}
                            onValueChange={(value) => updateStatus(article.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Bản nháp</SelectItem>
                              <SelectItem value="published">Xuất bản</SelectItem>
                              <SelectItem value="scheduled">Lên lịch</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFeatured(article.id, article.featured)}
                          >
                            {article.featured ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {format(new Date(article.created_at), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(article)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticlesManagement;