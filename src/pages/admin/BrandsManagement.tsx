import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Image, Home } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const BrandsManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch brands from database
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Update brand mutation
  const updateBrandMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from('brands')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({ title: "Cập nhật thành công" });
    },
    onError: () => {
      toast({ title: "Có lỗi xảy ra", variant: "destructive" });
    }
  });

  // Delete brand mutation
  const deleteBrandMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({ title: "Xóa thành công" });
    },
    onError: () => {
      toast({ title: "Có lỗi xảy ra", variant: "destructive" });
    }
  });

  const categories = [
    "Chăm sóc trẻ em",
    "Làm đẹp",
    "Máy ảnh",
    "Ảnh & In ấn",
    "Thời trang",
    "Khác"
  ];

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhãn hàng này?')) {
      deleteBrandMutation.mutate(id);
    }
  };

  const toggleFeatured = (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (brand) {
      updateBrandMutation.mutate({
        id,
        updates: { featured: !brand.featured }
      });
    }
  };

  const toggleActive = (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (brand) {
      updateBrandMutation.mutate({
        id,
        updates: { active: !brand.active }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">Quản lý Nhãn hàng</h1>
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Xem trang chủ
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">Quản lý thông tin các nhãn hàng và sản phẩm</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBrand(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhãn hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBrand ? "Chỉnh sửa nhãn hàng" : "Thêm nhãn hàng mới"}
              </DialogTitle>
              <DialogDescription>
                Điền thông tin chi tiết về nhãn hàng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand-name">Tên nhãn hàng</Label>
                  <Input
                    id="brand-name"
                    defaultValue={editingBrand?.name || ""}
                    placeholder="Nhập tên nhãn hàng"
                  />
                </div>
                <div>
                  <Label htmlFor="brand-slug">Slug (URL)</Label>
                  <Input
                    id="brand-slug"
                    defaultValue={editingBrand?.slug || ""}
                    placeholder="ten-nhan-hang"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="brand-category">Danh mục</Label>
                <Select defaultValue={editingBrand?.category || ""}>
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
                <Label htmlFor="brand-description">Mô tả</Label>
                <Textarea
                  id="brand-description"
                  defaultValue={editingBrand?.description || ""}
                  placeholder="Mô tả ngắn về nhãn hàng"
                  rows={3}
                />
              </div>
              <div>
                <Label>Hình ảnh nhãn hàng</Label>
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
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingBrand ? "Cập nhật" : "Thêm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhãn hàng</CardTitle>
          <CardDescription>
            Quản lý tất cả nhãn hàng đang phân phối
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên nhãn hàng</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Nổi bật</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <img
                      src={brand.image_url}
                      alt={brand.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{brand.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {brand.description}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={brand.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(brand.id)}
                    >
                      {brand.featured ? "Nổi bật" : "Thường"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge variant={brand.active ? "default" : "secondary"}>
                      {brand.active ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/brands/${brand.slug}`, '_blank')}
                        title="Xem trang chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(brand)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(brand.id)}
                        title="Xóa"
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

export default BrandsManagement;