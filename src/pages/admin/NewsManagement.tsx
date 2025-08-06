import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Image, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewsManagement = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Ra mắt sản phẩm mới từ Pigeon",
      slug: "ra-mat-san-pham-moi-tu-pigeon",
      category: "Sản phẩm",
      excerpt: "Pigeon giới thiệu dòng sản phẩm chăm sóc trẻ em mới nhất với công nghệ tiên tiến...",
      content: "Nội dung đầy đủ bài viết...",
      image: "/placeholder.svg",
      author: "Admin",
      publishDate: "2024-01-15",
      status: "published",
      featured: true
    },
    {
      id: 2,
      title: "Hội thảo làm đẹp cùng Verites",
      slug: "hoi-thao-lam-dep-cung-verites",
      category: "Sự kiện",
      excerpt: "Tham gia hội thảo làm đẹp với các chuyên gia từ Verites Nhật Bản...",
      content: "Nội dung đầy đủ bài viết...",
      image: "/placeholder.svg",
      author: "Marketing Team",
      publishDate: "2024-01-10",
      status: "published",
      featured: false
    },
    {
      id: 3,
      title: "Xu hướng chụp ảnh với Instax 2024",
      slug: "xu-huong-chup-anh-voi-instax-2024",
      category: "Xu hướng",
      excerpt: "Khám phá những xu hướng chụp ảnh mới nhất với máy ảnh Instax...",
      content: "Nội dung đầy đủ bài viết...",
      image: "/placeholder.svg",
      author: "Content Team",
      publishDate: "2024-01-05",
      status: "draft",
      featured: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const categories = [
    "Sản phẩm",
    "Sự kiện", 
    "Xu hướng",
    "Tin tức công ty",
    "Hướng dẫn",
    "Khác"
  ];

  const statuses = [
    { value: "draft", label: "Nháp", variant: "secondary" },
    { value: "published", label: "Đã xuất bản", variant: "default" },
    { value: "archived", label: "Lưu trữ", variant: "outline" }
  ];

  const handleEdit = (newsItem: any) => {
    setEditingNews(newsItem);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const toggleFeatured = (id: number) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const updateStatus = (id: number, newStatus: string) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
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
          <h1 className="text-3xl font-bold">Quản lý Tin tức</h1>
          <p className="text-muted-foreground">Tạo và quản lý bài viết tin tức</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingNews(null)}>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="news-title">Tiêu đề</Label>
                  <Input
                    id="news-title"
                    defaultValue={editingNews?.title || ""}
                    placeholder="Nhập tiêu đề bài viết"
                  />
                </div>
                <div>
                  <Label htmlFor="news-slug">Slug (URL)</Label>
                  <Input
                    id="news-slug"
                    defaultValue={editingNews?.slug || ""}
                    placeholder="tieu-de-bai-viet"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="news-category">Danh mục</Label>
                  <Select defaultValue={editingNews?.category || ""}>
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
                    defaultValue={editingNews?.author || "Admin"}
                    placeholder="Tên tác giả"
                  />
                </div>
                <div>
                  <Label htmlFor="news-date">Ngày xuất bản</Label>
                  <Input
                    id="news-date"
                    type="date"
                    defaultValue={editingNews?.publishDate || ""}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="news-excerpt">Tóm tắt</Label>
                <Textarea
                  id="news-excerpt"
                  defaultValue={editingNews?.excerpt || ""}
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="news-content">Nội dung</Label>
                <Textarea
                  id="news-content"
                  defaultValue={editingNews?.content || ""}
                  placeholder="Nội dung đầy đủ bài viết"
                  rows={10}
                />
              </div>

              <div>
                <Label>Hình ảnh đại diện</Label>
                <div className="mt-2">
                  <Button variant="outline" className="w-full">
                    <Image className="h-4 w-4 mr-2" />
                    Tải lên hình ảnh
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="outline">
                Lưu nháp
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Ngày xuất bản</TableHead>
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
                      src={item.image}
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
                      <span className="text-sm">{item.publishDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={item.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(item.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;