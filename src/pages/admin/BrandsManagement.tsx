import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Image, Home, Layout } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const BrandsManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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

  // Add brand mutation
  const addBrandMutation = useMutation({
    mutationFn: async (brandData: any) => {
      const { error } = await supabase
        .from('brands')
        .insert([brandData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({ title: "Thêm nhãn hàng thành công" });
      setIsDialogOpen(false);
      setEditingBrand(null);
      setImageFile(null);
    },
    onError: () => {
      toast({ title: "Có lỗi xảy ra", variant: "destructive" });
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
      if (!editingBrand) {
        setIsDialogOpen(false);
        setImageFile(null);
      }
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

  // Upload image to storage
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('brand-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('brand-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (formData: FormData) => {
    setIsUploading(true);
    try {
      let imageUrl = editingBrand?.image_url || null;
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const brandData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        image_url: imageUrl,
      };

      if (editingBrand) {
        await updateBrandMutation.mutateAsync({
          id: editingBrand.id,
          updates: brandData
        });
      } else {
        await addBrandMutation.mutateAsync(brandData);
      }
    } catch (error) {
      toast({ title: "Có lỗi xảy ra khi xử lý", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setImageFile(null);
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
            <Button onClick={() => {
              setEditingBrand(null);
              setImageFile(null);
            }}>
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
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand-name">Tên nhãn hàng</Label>
                    <Input
                      id="brand-name"
                      name="name"
                      defaultValue={editingBrand?.name || ""}
                      placeholder="Nhập tên nhãn hàng"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand-slug">Slug (URL)</Label>
                    <Input
                      id="brand-slug"
                      name="slug"
                      defaultValue={editingBrand?.slug || ""}
                      placeholder="ten-nhan-hang"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="brand-category">Danh mục</Label>
                  <Select name="category" defaultValue={editingBrand?.category || ""} required>
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
                    name="description"
                    defaultValue={editingBrand?.description || ""}
                    placeholder="Mô tả ngắn về nhãn hàng"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Hình ảnh nhãn hàng</Label>
                  {editingBrand?.image_url && !imageFile && (
                    <div className="mt-2 mb-2">
                      <img 
                        src={editingBrand.image_url} 
                        alt="Current brand image" 
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    {imageFile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Đã chọn: {imageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingBrand(null);
                    setImageFile(null);
                  }}
                  disabled={isUploading}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Đang xử lý..." : (editingBrand ? "Cập nhật" : "Thêm")}
                </Button>
              </DialogFooter>
            </form>
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
                        asChild
                        title="Quản lý trang"
                      >
                        <Link to={`/admin/brands/${brand.slug}/builder`}>
                          <Layout className="h-4 w-4" />
                        </Link>
                      </Button>
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