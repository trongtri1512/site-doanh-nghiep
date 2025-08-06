import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Image, Calendar, Upload, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const NewsManagement = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    author: "Admin",
    publishDate: "",
    scheduledDate: "",
    status: "draft",
    featured: false,
    imageFile: null as File | null,
    imageUrl: ""
  });

  const categories = [
    "Sản phẩm",
    "Sự kiện", 
    "Xu hướng",
    "Tin tức công ty",
    "Hướng dẫn",
    "Thương hiệu",
    "Thành tích",
    "Khác"
  ];

  const statuses = [
    { value: "draft", label: "Nháp", variant: "secondary" },
    { value: "published", label: "Đã xuất bản", variant: "default" },
    { value: "scheduled", label: "Lên lịch", variant: "outline" },
    { value: "archived", label: "Lưu trữ", variant: "outline" }
  ];

  // Load news from Supabase
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error loading news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách tin tức",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      author: "Admin",
      publishDate: "",
      scheduledDate: "",
      status: "draft",
      featured: false,
      imageFile: null,
      imageUrl: ""
    });
    setEditingNews(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đ]/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleEdit = (newsItem: any) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      slug: newsItem.slug,
      category: newsItem.category,
      excerpt: newsItem.excerpt || "",
      content: newsItem.content || "",
      author: newsItem.author,
      publishDate: newsItem.published_at ? newsItem.published_at.split('T')[0] : "",
      scheduledDate: newsItem.scheduled_at ? newsItem.scheduled_at.split('T')[0] : "",
      status: newsItem.status,
      featured: newsItem.featured,
      imageFile: null,
      imageUrl: newsItem.image_url || ""
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
        description: "Đã xóa tin tức",
      });
      
      loadNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa tin tức",
        variant: "destructive",
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
        description: `Đã ${!currentFeatured ? "đặt" : "bỏ"} tin tức nổi bật`,
      });
      
      loadNews();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái nổi bật",
        variant: "destructive",
      });
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã cập nhật trạng thái",
      });
      
      loadNews();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái",
        variant: "destructive",
      });
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải lên hình ảnh",
        variant: "destructive",
      });
      return null;
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const imageUrl = await uploadImage(file);
          if (imageUrl) {
            setFormData(prev => ({ ...prev, imageUrl }));
            toast({
              title: "Thành công",
              description: "Đã tải lên hình ảnh từ clipboard",
            });
          }
        }
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData(prev => ({ ...prev, imageUrl }));
      toast({
        title: "Thành công",
        description: "Đã tải lên hình ảnh",
      });
    }
  };

  const handleSubmit = async (status: string = 'draft') => {
    if (!formData.title || !formData.category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    // Validate scheduled posts
    if (status === 'scheduled' && !formData.scheduledDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ngày lên lịch",
        variant: "destructive",
      });
      return;
    }

    const slug = formData.slug || generateSlug(formData.title);

    try {
      const newsData = {
        title: formData.title,
        slug,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        image_url: formData.imageUrl,
        published_at: status === 'published' ? new Date().toISOString() : (formData.publishDate ? new Date(formData.publishDate).toISOString() : null),
        scheduled_at: status === 'scheduled' ? new Date(formData.scheduledDate).toISOString() : null,
        status,
        featured: formData.featured
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
        description: editingNews ? "Đã cập nhật tin tức" : "Đã tạo tin tức mới",
      });

      setIsDialogOpen(false);
      resetForm();
      loadNews();
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu tin tức",
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold">Quản lý Tin tức</h1>
          <p className="text-muted-foreground">Tạo và quản lý bài viết tin tức</p>
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
              </DialogTitle>
              <DialogDescription>
                Tạo hoặc chỉnh sửa bài viết tin tức
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4" onPaste={handlePaste}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="news-title">Tiêu đề *</Label>
                  <Input
                    id="news-title"
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
                <div>
                  <Label htmlFor="news-slug">Slug (URL)</Label>
                  <Input
                    id="news-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="tieu-de-bai-viet"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="news-category">Danh mục *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="news-author">Tác giả</Label>
                  <Input
                    id="news-author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Tên tác giả"
                  />
                </div>
                <div>
                  <Label htmlFor="news-date">Ngày xuất bản</Label>
                  <Input
                    id="news-date"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduled-date">Ngày lên lịch</Label>
                  <Input
                    id="scheduled-date"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="news-excerpt">Tóm tắt</Label>
                <Textarea
                  id="news-excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="news-content">Nội dung</Label>
                <Textarea
                  id="news-content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Nội dung đầy đủ bài viết"
                  rows={10}
                />
              </div>

              <div>
                <Label>Hình ảnh đại diện</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => document.getElementById('image-upload')?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên hình ảnh
                    </Button>
                    <Button variant="outline" type="button">
                      Paste ảnh (Ctrl+V)
                    </Button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                />
                <Label htmlFor="featured">Đặt làm tin tức nổi bật</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="outline" onClick={() => handleSubmit('draft')}>
                Lưu nháp
              </Button>
              <Button variant="outline" onClick={() => handleSubmit('scheduled')}>
                Lên lịch
              </Button>
              <Button onClick={() => handleSubmit('published')}>
                Xuất bản
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tức</CardTitle>
          <CardDescription>
            Quản lý tất cả bài viết tin tức
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead>Ngày xuất bản</TableHead>
                  <TableHead>Lên lịch</TableHead>
                  <TableHead>Nổi bật</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{item.title}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {item.excerpt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          {item.published_at ? new Date(item.published_at).toLocaleDateString('vi-VN') : 'Chưa đặt'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">
                          {item.scheduled_at ? new Date(item.scheduled_at).toLocaleString('vi-VN') : '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={item.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(item.id, item.featured)}
                      >
                        {item.featured ? "Nổi bật" : "Thường"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => updateStatus(item.id, value)}
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
                          onClick={() => window.open(`/news/${item.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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
    </div>
  );
};

export default NewsManagement;