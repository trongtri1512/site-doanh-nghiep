import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItemFormData {
  title: string;
  url: string;
  target: string;
  parent_id: string | null;
  display_order: number;
  is_active: boolean;
}

interface MenuItemWithLanguage extends MenuItemFormData {
  id: string;
  language_code: string;
  menu_type: string;
}

const MenusManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('vi');
  const [editingItem, setEditingItem] = useState<MenuItemWithLanguage | null>(null);
  const [newItem, setNewItem] = useState<MenuItemFormData>({
    title: '',
    url: '',
    target: '_self',
    parent_id: null,
    display_order: 0,
    is_active: true
  });

  // Fetch menu items for current language
  const { data: menuItems = [] } = useQuery({
    queryKey: ['menu-items', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_type', 'main')
        .eq('language_code', activeTab)
        .order('display_order');
      
      if (error) throw error;
      return data as MenuItemWithLanguage[];
    }
  });

  // Get parent menu items for dropdown
  const parentItems = menuItems.filter(item => !item.parent_id);

  // Add new menu item
  const addItemMutation = useMutation({
    mutationFn: async (itemData: MenuItemFormData) => {
      const { error } = await supabase
        .from('menu_items')
        .insert({
          ...itemData,
          language_code: activeTab,
          menu_type: 'main'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      setNewItem({
        title: '',
        url: '',
        target: '_self',
        parent_id: null,
        display_order: 0,
        is_active: true
      });
      toast({ title: 'Thêm menu thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi thêm menu', variant: 'destructive' });
    }
  });

  // Update menu item
  const updateItemMutation = useMutation({
    mutationFn: async (item: MenuItemWithLanguage) => {
      const { error } = await supabase
        .from('menu_items')
        .update({
          title: item.title,
          url: item.url,
          target: item.target,
          parent_id: item.parent_id,
          display_order: item.display_order,
          is_active: item.is_active
        })
        .eq('id', item.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      setEditingItem(null);
      toast({ title: 'Cập nhật menu thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi cập nhật menu', variant: 'destructive' });
    }
  });

  // Delete menu item
  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      toast({ title: 'Xóa menu thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi xóa menu', variant: 'destructive' });
    }
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.url) {
      toast({ title: 'Vui lòng điền đầy đủ thông tin', variant: 'destructive' });
      return;
    }
    addItemMutation.mutate(newItem);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      updateItemMutation.mutate(editingItem);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Languages size={32} />
          Quản lý Menu đa ngôn ngữ
        </h1>
        <p className="text-muted-foreground">Quản lý menu cho từng ngôn ngữ</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="vi" className="flex items-center gap-2">
            🇻🇳 Tiếng Việt
          </TabsTrigger>
          <TabsTrigger value="en" className="flex items-center gap-2">
            🇺🇸 English
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Add new menu item */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                Thêm menu mới - {activeTab === 'vi' ? 'Tiếng Việt' : 'English'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={activeTab === 'vi' ? 'Về chúng tôi' : 'About Us'}
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    value={newItem.url}
                    onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="/about"
                  />
                </div>
                <div>
                  <Label htmlFor="target">Target</Label>
                  <Select 
                    value={newItem.target} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, target: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_self">Same window</SelectItem>
                      <SelectItem value="_blank">New window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="parent_id">Parent Menu</Label>
                  <Select 
                    value={newItem.parent_id || 'none'} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, parent_id: value === 'none' ? null : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Root menu)</SelectItem>
                      {parentItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="display_order">Thứ tự hiển thị</Label>
                  <Input
                    type="number"
                    value={newItem.display_order}
                    onChange={(e) => setNewItem(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newItem.is_active}
                    onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label>Kích hoạt</Label>
                </div>
              </div>
              <Button onClick={handleAddItem} disabled={addItemMutation.isPending}>
                <Plus size={16} className="mr-2" />
                Thêm menu
              </Button>
            </CardContent>
          </Card>

          {/* Menu items list */}
          <Card>
            <CardHeader>
              <CardTitle>
                Danh sách menu - {activeTab === 'vi' ? 'Tiếng Việt' : 'English'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Tiêu đề</Label>
                        {editingItem?.id === item.id ? (
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : null)}
                          />
                        ) : (
                          <p className="font-medium">{item.title}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">URL</Label>
                        {editingItem?.id === item.id ? (
                          <Input
                            value={editingItem.url}
                            onChange={(e) => setEditingItem(prev => prev ? { ...prev, url: e.target.value } : null)}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.url}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Parent</Label>
                        <p className="text-sm">
                          {item.parent_id 
                            ? parentItems.find(p => p.id === item.parent_id)?.title || 'Unknown'
                            : 'Root'
                          }
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Thứ tự</Label>
                        {editingItem?.id === item.id ? (
                          <Input
                            type="number"
                            value={editingItem.display_order}
                            onChange={(e) => setEditingItem(prev => prev ? { ...prev, display_order: parseInt(e.target.value) || 0 } : null)}
                          />
                        ) : (
                          <p className="text-sm">{item.display_order}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Trạng thái</Label>
                        <div className="flex items-center gap-2">
                          {editingItem?.id === item.id ? (
                            <Switch
                              checked={editingItem.is_active}
                              onCheckedChange={(checked) => setEditingItem(prev => prev ? { ...prev, is_active: checked } : null)}
                            />
                          ) : (
                            <Badge variant={item.is_active ? "default" : "secondary"}>
                              {item.is_active ? 'Hoạt động' : 'Tạm dừng'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {editingItem?.id === item.id ? (
                        <>
                          <Button size="sm" onClick={handleUpdateItem} disabled={updateItemMutation.isPending}>
                            <Save size={16} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                            <X size={16} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => deleteItemMutation.mutate(item.id)}
                            disabled={deleteItemMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenusManagement;