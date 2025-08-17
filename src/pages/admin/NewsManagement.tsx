import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon, Edit, Trash2, Plus, Eye, EyeOff, Hash, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import TipTapEditor from '@/components/admin/TipTapEditor';
import CategorySelector from '@/components/admin/CategorySelector';
import HashtagInput from '@/components/admin/HashtagInput';
import SEOFields from '@/components/admin/SEOFields';

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  language_code: string;
  hashtags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
}

const NewsManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('vi');

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    category: string;
    author: string;
    status: 'draft' | 'published' | 'scheduled';
    featured: boolean;
    scheduled_at: Date | null;
    language_code: string;
    hashtags: string[];
    meta_title: string;
    meta_description: string;
    focus_keyword: string;
  }>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Admin',
    status: 'draft',
    featured: false,
    scheduled_at: null,
    language_code: 'vi',
    hashtags: [],
    meta_title: '',
    meta_description: '',
    focus_keyword: ''
  });

  useEffect(() => {
    fetchNews();
  }, [selectedLanguage]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('language_code', selectedLanguage)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews((data || []) as News[]);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách tin tức",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const newsData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        category: formData.category,
        author: formData.author,
        status: formData.status,
        featured: formData.featured,
        scheduled_at: formData.scheduled_at?.toISOString() || null,
        language_code: formData.language_code,
        hashtags: formData.hashtags,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        focus_keyword: formData.focus_keyword || null
      };

      let error;
      if (editingNews) {
        ({ error } = await supabase
          .from('news')
          .update(newsData)
          .eq('id', editingNews.id));
      } else {
        ({ error } = await supabase
          .from('news')
          .insert([newsData]));
      }

      if (error) throw error;

      toast({
        title: "Thành công",
        description: editingNews ? "Đã cập nhật tin tức" : "Đã tạo tin tức mới"
      });

      setIsDialogOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu tin tức",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: '',
      author: 'Admin',
      status: 'draft' as const,
      featured: false,
      scheduled_at: null,
      language_code: 'vi',
      hashtags: [],
      meta_title: '',
      meta_description: '',
      focus_keyword: ''
    });
    setEditingNews(null);
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      content: news.content,
      image_url: news.image_url || '',
      category: news.category,
      author: news.author,
      status: news.status,
      featured: news.featured,
      scheduled_at: news.scheduled_at ? new Date(news.scheduled_at) : null,
      language_code: news.language_code,
      hashtags: news.hashtags || [],
      meta_title: news.meta_title || '',
      meta_description: news.meta_description || '',
      focus_keyword: news.focus_keyword || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa tin tức"
      });

      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa tin tức",
        variant: "destructive"
      });
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ featured: !featured })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: `Đã ${!featured ? 'đặt' : 'bỏ'} tin tức nổi bật`
      });

      fetchNews();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái nổi bật",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Đã xuất bản</Badge>;
      case 'draft':
        return <Badge variant="secondary">Bản nháp</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Lên lịch</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Tin tức</h1>
          <p className="text-muted-foreground">Tạo và quản lý bài viết tin tức với SEO và hashtag</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm tin tức
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="space-y-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Nội dung</TabsTrigger>
                    <TabsTrigger value="seo">
                      <Search className="h-4 w-4 mr-1" />
                      SEO
                    </TabsTrigger>
                    <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-6">
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
                          languageCode={selectedLanguage}
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
                      <TipTapEditor
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        placeholder="Nhập nội dung bài viết..."
                        height={400}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-6">
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

                  <TabsContent value="settings" className="space-y-6">
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
                              selected={formData.scheduled_at}
                              onSelect={(date) => setFormData(prev => ({ ...prev, scheduled_at: date }))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingNews ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách tin tức</CardTitle>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Chuyên mục</TableHead>
                  <TableHead>Hashtags</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Nổi bật</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-xs">
                      <div>
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{item.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.hashtags?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {item.hashtags && item.hashtags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.hashtags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(item.id, item.featured)}
                      >
                        {item.featured ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa tin tức "{item.title}"? Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;