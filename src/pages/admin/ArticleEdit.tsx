import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Save, Upload, Eye, Loader2 } from "lucide-react";
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
}

const ArticleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

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
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setArticle(data);
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          image_url: data.image_url,
          category: data.category,
          status: data.status,
          featured: data.featured,
          language_code: data.language_code
        });
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin bài viết",
        variant: "destructive"
      });
      navigate('/admin/articles');
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

    setSaving(true);
    try {
      const articleData = {
        ...formData,
        status,
        author: user?.email || 'admin',
        language_code: formData.language_code,
        published_at: status === 'published' && !article?.published_at ? new Date().toISOString() : article?.published_at
      };

      const { error } = await supabase
        .from('news')
        .update(articleData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã cập nhật bài viết"
      });

      navigate('/admin/articles');
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật bài viết",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy bài viết</p>
        <Button onClick={() => navigate('/admin/articles')} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/articles')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Chỉnh sửa bài viết</h1>
          <p className="text-muted-foreground">Cập nhật bài viết nội dung</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    }));
                  }}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-bai-viet"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Chuyên mục</Label>
                <CategorySelector
                  selectedCategories={formData.category ? [formData.category] : []}
                  onCategoriesChange={(categories) => setFormData(prev => ({ ...prev, category: categories[0] || '' }))}
                  languageCode={formData.language_code}
                  multiple={false}
                  placeholder="Chọn chuyên mục bài viết"
                />
              </div>

              <div>
                <Label>Ngôn ngữ</Label>
                <Select
                  value={formData.language_code}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language_code: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Tóm tắt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Nhập tóm tắt ngắn gọn về bài viết"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Nội dung bài viết *</Label>
              <TinyMCEEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Nhập nội dung chi tiết của bài viết"
                height={500}
              />
            </div>

            <div>
              <Label htmlFor="image_url">Hình ảnh đại diện</Label>
              <div className="space-y-2">
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-32 w-auto rounded-lg"
                  />
                )}
                <Input
                  id="image_url"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              />
              <Label htmlFor="featured">Bài viết nổi bật</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/articles')}
              disabled={saving}
            >
              Hủy
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu nháp
            </Button>
            <Button
              onClick={() => handleSubmit("published")}
              disabled={saving}
            >
              <Eye className="h-4 w-4 mr-2" />
              Xuất bản
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleEdit;