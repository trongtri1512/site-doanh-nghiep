import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ArrowLeft, Save, Eye, Hash, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import TinyMCEEditor from '@/components/admin/TinyMCEEditor';
import CategorySelector from '@/components/admin/CategorySelector';
import HashtagInput from '@/components/admin/HashtagInput';
import SEOFields from '@/components/admin/SEOFields';

const NewsCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Admin',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    featured: false,
    scheduled_at: null as Date | null,
    language_code: 'vi',
    hashtags: [] as string[],
    meta_title: '',
    meta_description: '',
    focus_keyword: ''
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSubmit = async (status: 'draft' | 'published' | 'scheduled') => {
    if (!formData.title || !formData.category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const slug = formData.slug || generateSlug(formData.title);
      const newsData = {
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        category: formData.category,
        author: formData.author,
        status: status,
        featured: formData.featured,
        scheduled_at: formData.scheduled_at?.toISOString() || null,
        language_code: formData.language_code,
        hashtags: formData.hashtags,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        focus_keyword: formData.focus_keyword || null,
        published_at: status === 'published' ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('news')
        .insert([newsData]);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã tạo tin tức mới"
      });

      navigate('/admin/news');
    } catch (error) {
      console.error('Error creating news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo tin tức",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/news')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Tạo tin tức mới</h1>
          <p className="text-muted-foreground">Tạo bài viết tin tức với SEO và hashtag</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="seo">
                <Search className="h-4 w-4 mr-1" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        title,
                        slug: generateSlug(title)
                      }));
                    }}
                    placeholder="Nhập tiêu đề bài viết"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="ten-bai-viet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Ảnh đại diện</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="URL ảnh đại diện"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Tác giả</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Tên tác giả"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chuyên mục *</Label>
                  <CategorySelector
                    selectedCategories={formData.category ? [formData.category] : []}
                    onCategoriesChange={(categories) => setFormData(prev => ({ ...prev, category: categories[0] || '' }))}
                    languageCode={formData.language_code}
                    multiple={false}
                    placeholder="Chọn chuyên mục"
                  />
                </div>

                <div className="space-y-2">
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

              <div className="space-y-2">
                <Label htmlFor="excerpt">Tóm tắt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Hashtags
                </Label>
                <HashtagInput
                  value={formData.hashtags}
                  onChange={(hashtags) => setFormData(prev => ({ ...prev, hashtags }))}
                  placeholder="Thêm hashtag..."
                />
              </div>

              <div className="space-y-2">
                <Label>Nội dung</Label>
                <TinyMCEEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Nhập nội dung bài viết..."
                  height={400}
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6 mt-6">
              <SEOFields
                title={formData.title}
                metaTitle={formData.meta_title}
                metaDescription={formData.meta_description}
                focusKeyword={formData.focus_keyword}
                content={formData.content}
                onMetaTitleChange={(meta_title) => setFormData(prev => ({ ...prev, meta_title }))}
                onMetaDescriptionChange={(meta_description) => setFormData(prev => ({ ...prev, meta_description }))}
                onFocusKeywordChange={(focus_keyword) => setFormData(prev => ({ ...prev, focus_keyword }))}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published' | 'scheduled') => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Đã xuất bản</SelectItem>
                      <SelectItem value="scheduled">Lên lịch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Bài viết nổi bật</Label>
                </div>

                {formData.status === 'scheduled' && (
                  <div className="space-y-2">
                    <Label>Thời gian xuất bản</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.scheduled_at && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.scheduled_at ? format(formData.scheduled_at, "PPP") : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.scheduled_at || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, scheduled_at: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/news')}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit('draft')}
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu nháp
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={loading}
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

export default NewsCreate;