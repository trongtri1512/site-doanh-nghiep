
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MenusManagement = () => {
  const [activeTab, setActiveTab] = useState("vi");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", url: "", target: "_self", parentId: "none", displayType: "dropdown" });
  const queryClient = useQueryClient();

  // Fetch menu items from database for current language
  const { data: menuItems = [] } = useQuery({
    queryKey: ['menu-items', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('language_code', activeTab)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch brands for brand menu
  const { data: brandItems = [] } = useQuery({
    queryKey: ['brands-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data.map(brand => ({
        id: brand.id,
        title: brand.name,
        url: `/brands/${brand.slug}`,
        order: brand.display_order,
        active: brand.active,
        type: 'brands'
      }));
    }
  });

  const mainMenuItems = menuItems?.filter(item => item.menu_type === 'main') || [];
  const parentMenuItems = mainMenuItems.filter(item => !item.parent_id);
  const childMenuItems = mainMenuItems.filter(item => item.parent_id);

  // Mutations for CRUD operations
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('menu_items')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      queryClient.invalidateQueries({ queryKey: ['menu-items-main'] });
      toast.success("Đã thêm menu mới");
      setIsDialogOpen(false);
      setFormData({ title: "", url: "", target: "_self", parentId: "none", displayType: "dropdown" });
      setEditingItem(null);
    },
    onError: () => toast.error("Lỗi khi thêm menu")
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: any) => {
      const { error } = await supabase
        .from('menu_items')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      queryClient.invalidateQueries({ queryKey: ['menu-items-main'] });
      toast.success("Đã cập nhật menu");
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ title: "", url: "", target: "_self", parentId: "none", displayType: "dropdown" });
    },
    onError: () => toast.error("Lỗi khi cập nhật menu")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      queryClient.invalidateQueries({ queryKey: ['menu-items-main'] });
      toast.success("Đã xóa menu");
    },
    onError: () => toast.error("Lỗi khi xóa menu")
  });

  // Mutation for reordering
  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      const { error } = await supabase
        .from('menu_items')
        .update({ display_order: newOrder })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      queryClient.invalidateQueries({ queryKey: ['menu-items-main'] });
      toast.success("Đã cập nhật thứ tự menu");
    },
    onError: () => toast.error("Lỗi khi cập nhật thứ tự menu")
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || "",
        url: editingItem.url || "",
        target: editingItem.target || "_self",
        parentId: editingItem.parent_id || "none",
        displayType: editingItem.display_type || "dropdown"
      });
    }
  }, [editingItem]);

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string, type: string) => {
    if (type === "main") {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề menu");
      return;
    }

    if (!formData.url && formData.parentId === "none") {
      toast.error("Vui lòng nhập URL hoặc chọn làm menu con");
      return;
    }

    const data = {
      title: formData.title,
      url: formData.url || '#',
      target: formData.target,
      menu_type: 'main',
      parent_id: formData.parentId === "none" ? null : formData.parentId,
      display_order: mainMenuItems.length + 1,
      language_code: activeTab,
      display_type: formData.displayType
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleMoveUp = (item: any) => {
    const currentIndex = mainMenuItems.findIndex(i => i.id === item.id);
    if (currentIndex > 0) {
      const newOrder = mainMenuItems[currentIndex - 1].display_order;
      reorderMutation.mutate({ id: item.id, newOrder });
      // Also update the other item
      const otherItem = mainMenuItems[currentIndex - 1];
      reorderMutation.mutate({ id: otherItem.id, newOrder: item.display_order });
    }
  };

  const handleMoveDown = (item: any) => {
    const currentIndex = mainMenuItems.findIndex(i => i.id === item.id);
    if (currentIndex < mainMenuItems.length - 1) {
      const newOrder = mainMenuItems[currentIndex + 1].display_order;
      reorderMutation.mutate({ id: item.id, newOrder });
      // Also update the other item
      const otherItem = mainMenuItems[currentIndex + 1];
      reorderMutation.mutate({ id: otherItem.id, newOrder: item.display_order });
    }
  };

  const addBrandMenu = () => {
    console.log("Clicked add brand menu button");
    const data = {
      title: activeTab === "vi" ? "Các nhãn hàng" : "Our Brands",
      url: "#",
      target: "_self",
      menu_type: 'main',
      parent_id: null,
      display_order: mainMenuItems.length + 1,
      language_code: activeTab
    };
    createMutation.mutate(data);
  };

  const MenuTable = ({ items, type, onEdit, onDelete }: any) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Thứ tự</TableHead>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Kiểu hiển thị</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item: any) => (
          <TableRow key={item.id}>
             <TableCell>
               <div className="flex items-center space-x-2">
                 <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                 <span>{item.display_order || item.order}</span>
               </div>
             </TableCell>
            <TableCell className="font-medium">
              {item.parent_id && <span className="text-muted-foreground mr-2">↳</span>}
              {item.title}
              {!item.parent_id && items.filter((i: any) => i.parent_id === item.id).length > 0 && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Dropdown
                </span>
              )}
            </TableCell>
            <TableCell className="font-mono text-sm">{item.url}</TableCell>
            <TableCell>
              {item.display_type === 'megamenu' ? (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Mega Menu
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  Dropdown
                </Badge>
              )}
            </TableCell>
             <TableCell>
               <Badge variant={item.is_active || item.active ? "default" : "secondary"}>
                 {item.is_active || item.active ? "Hiển thị" : "Ẩn"}
               </Badge>
             </TableCell>
             <TableCell className="text-right">
               <div className="flex justify-end space-x-2">
                 {type === "main" && (
                   <>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => handleMoveUp(item)}
                       disabled={items.findIndex((i: any) => i.id === item.id) === 0}
                     >
                       <ChevronUp className="h-4 w-4" />
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => handleMoveDown(item)}
                       disabled={items.findIndex((i: any) => i.id === item.id) === items.length - 1}
                     >
                       <ChevronDown className="h-4 w-4" />
                     </Button>
                   </>
                 )}
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => onEdit(item, type)}
                 >
                   <Edit className="h-4 w-4" />
                 </Button>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => onDelete(item.id, type)}
                 >
                   <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
             </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  console.log("Rendering MenusManagement, menuItems:", menuItems, "mainMenuItems:", mainMenuItems);
  
  if (!menuItems) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý Menu</h1>
        <p className="text-muted-foreground">Chỉnh sửa menu chính. Bạn có thể tạo menu dropdown bằng cách chọn menu cha khi thêm menu mới.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6 mt-6">

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Menu chính</CardTitle>
              <CardDescription>
                Quản lý các mục menu chính hiển thị trên header. Chọn menu cha để tạo dropdown.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={addBrandMenu} variant="outline">
                Thêm Menu Nhãn hàng
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    console.log("Clicked add menu button");
                    setEditingItem(null);
                    setFormData({ title: "", url: "", target: "_self", parentId: "none", displayType: "dropdown" });
                    setIsDialogOpen(true);
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm menu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Chỉnh sửa menu" : "Thêm menu mới"}</DialogTitle>
                    <DialogDescription>
                      {editingItem ? "Cập nhật thông tin menu" : "Tạo một mục menu mới cho navigation chính"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Tiêu đề</Label>
                      <Input 
                        id="title" 
                        placeholder="Nhập tiêu đề menu"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input 
                        id="url" 
                        placeholder="/duong-dan hoặc chọn nhãn hàng bên dưới"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentId">Menu cha (tùy chọn)</Label>
                      <Select value={formData.parentId} onValueChange={(value) => setFormData(prev => ({ ...prev, parentId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn menu cha để tạo dropdown" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Không có (menu chính)</SelectItem>
                          {parentMenuItems?.map((parent) => (
                            <SelectItem key={parent.id} value={parent.id}>
                              {parent.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="displayType">Kiểu hiển thị</Label>
                      <Select value={formData.displayType} onValueChange={(value) => setFormData(prev => ({ ...prev, displayType: value }))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn kiểu hiển thị" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                          <SelectItem value="megamenu">Mega Menu</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mega Menu chỉ hoạt động với menu có chứa "Brand" hoặc URL chứa "/brands"
                      </p>
                    </div>
                    <div>
                      <Label>Hoặc chọn nhãn hàng</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {brandItems?.map((brand: any) => (
                          <Button
                            key={brand.id}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => setFormData(prev => ({ 
                              ...prev, 
                              title: brand.title,
                              url: brand.url 
                            }))}
                            className="justify-start"
                          >
                            {brand.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingItem(null);
                        setFormData({ title: "", url: "", target: "_self", parentId: "none", displayType: "dropdown" });
                      }}
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleSubmit}>{editingItem ? "Cập nhật" : "Thêm"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MenuTable
            items={mainMenuItems}
            type="main"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenusManagement;
