import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MenusManagement = () => {
  const [mainMenuItems, setMainMenuItems] = useState([
    { id: 1, title: "Trang chủ", url: "/", order: 1, active: true },
    { id: 2, title: "Về chúng tôi", url: "/about", order: 2, active: true },
    { id: 3, title: "Tin tức", url: "/news", order: 3, active: true },
    { id: 4, title: "Nghề nghiệp", url: "/careers", order: 4, active: true },
  ]);

  const [topMenuItems, setTopMenuItems] = useState([
    { id: 1, title: "Pigeon", url: "/brands/pigeon", order: 1, active: true },
    { id: 2, title: "Verites", url: "/brands/verites", order: 2, active: true },
    { id: 3, title: "Instax Camera", url: "/brands/instax-camera", order: 3, active: true },
    { id: 4, title: "Fujifilm Image", url: "/brands/fujifilm-image", order: 4, active: true },
    { id: 5, title: "Etsuko", url: "/brands/etsuko", order: 5, active: true },
    { id: 6, title: "Astalift", url: "/brands/astalift", order: 6, active: true },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentTab, setCurrentTab] = useState("main");

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number, type: string) => {
    if (type === "main") {
      setMainMenuItems(items => items.filter(item => item.id !== id));
    } else {
      setTopMenuItems(items => items.filter(item => item.id !== id));
    }
  };

  const MenuTable = ({ items, type, onEdit, onDelete }: any) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Thứ tự</TableHead>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <span>{item.order}</span>
              </div>
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell className="font-mono text-sm">{item.url}</TableCell>
            <TableCell>
              <Badge variant={item.active ? "default" : "secondary"}>
                {item.active ? "Hiển thị" : "Ẩn"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý Menu</h1>
        <p className="text-muted-foreground">Chỉnh sửa menu chính và menu nhãn hàng</p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="main">Menu chính</TabsTrigger>
          <TabsTrigger value="brands">Menu nhãn hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Menu chính</CardTitle>
                  <CardDescription>
                    Quản lý các mục menu chính hiển thị trên header
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm menu
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm menu mới</DialogTitle>
                      <DialogDescription>
                        Tạo một mục menu mới cho navigation chính
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input id="title" placeholder="Nhập tiêu đề menu" />
                      </div>
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input id="url" placeholder="/duong-dan" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Hủy</Button>
                      <Button>Thêm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

        <TabsContent value="brands">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Menu nhãn hàng</CardTitle>
                  <CardDescription>
                    Quản lý các nhãn hàng hiển thị trong dropdown menu
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm nhãn hàng
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm nhãn hàng mới</DialogTitle>
                      <DialogDescription>
                        Tạo một nhãn hàng mới trong menu dropdown
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="brand-title">Tên nhãn hàng</Label>
                        <Input id="brand-title" placeholder="Nhập tên nhãn hàng" />
                      </div>
                      <div>
                        <Label htmlFor="brand-url">URL</Label>
                        <Input id="brand-url" placeholder="/brands/ten-nhan-hang" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Hủy</Button>
                      <Button>Thêm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <MenuTable
                items={topMenuItems}
                type="brands"
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