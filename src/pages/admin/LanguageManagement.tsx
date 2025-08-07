import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_default: boolean;
  is_active: boolean;
  display_order: number;
}

interface Translation {
  id: string;
  language_code: string;
  translation_key: string;
  translation_value: string;
  category: string;
}

const LanguageManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [newTranslation, setNewTranslation] = useState({
    language_code: 'vi',
    translation_key: '',
    translation_value: '',
    category: 'general'
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch languages
  const { data: languages = [] } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as Language[];
    }
  });

  // Fetch translations
  const { data: translations = [] } = useQuery({
    queryKey: ['translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('category, translation_key');
      
      if (error) throw error;
      return data as Translation[];
    }
  });

  // Get unique categories
  const categories = [...new Set(translations.map(t => t.category))];

  // Filter translations by category
  const filteredTranslations = selectedCategory === 'all' 
    ? translations 
    : translations.filter(t => t.category === selectedCategory);

  // Toggle language status
  const toggleLanguageMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('languages')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      toast({ title: 'Cập nhật trạng thái ngôn ngữ thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi cập nhật trạng thái ngôn ngữ', variant: 'destructive' });
    }
  });

  // Add new translation
  const addTranslationMutation = useMutation({
    mutationFn: async (translation: typeof newTranslation) => {
      const { error } = await supabase
        .from('translations')
        .insert(translation);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      setNewTranslation({
        language_code: 'vi',
        translation_key: '',
        translation_value: '',
        category: 'general'
      });
      toast({ title: 'Thêm bản dịch thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi thêm bản dịch', variant: 'destructive' });
    }
  });

  // Update translation
  const updateTranslationMutation = useMutation({
    mutationFn: async (translation: Translation) => {
      const { error } = await supabase
        .from('translations')
        .update({
          translation_value: translation.translation_value,
          category: translation.category
        })
        .eq('id', translation.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      setEditingTranslation(null);
      toast({ title: 'Cập nhật bản dịch thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi cập nhật bản dịch', variant: 'destructive' });
    }
  });

  // Delete translation
  const deleteTranslationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast({ title: 'Xóa bản dịch thành công' });
    },
    onError: () => {
      toast({ title: 'Lỗi xóa bản dịch', variant: 'destructive' });
    }
  });

  const handleAddTranslation = () => {
    if (!newTranslation.translation_key || !newTranslation.translation_value) {
      toast({ title: 'Vui lòng điền đầy đủ thông tin', variant: 'destructive' });
      return;
    }
    addTranslationMutation.mutate(newTranslation);
  };

  const handleUpdateTranslation = () => {
    if (editingTranslation) {
      updateTranslationMutation.mutate(editingTranslation);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Quản lý Ngôn ngữ</h1>
        <p className="text-muted-foreground">Quản lý ngôn ngữ và bản dịch cho website</p>
      </div>

      <Tabs defaultValue="translations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="translations">Bản dịch</TabsTrigger>
          <TabsTrigger value="languages">Ngôn ngữ</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-6">
          {/* Add new translation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                Thêm bản dịch mới
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="language_code">Ngôn ngữ</Label>
                  <Select 
                    value={newTranslation.language_code} 
                    onValueChange={(value) => setNewTranslation(prev => ({ ...prev, language_code: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.native_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    value={newTranslation.category}
                    onChange={(e) => setNewTranslation(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Danh mục"
                  />
                </div>
                <div>
                  <Label htmlFor="translation_key">Khóa dịch</Label>
                  <Input
                    value={newTranslation.translation_key}
                    onChange={(e) => setNewTranslation(prev => ({ ...prev, translation_key: e.target.value }))}
                    placeholder="header.menu_item"
                  />
                </div>
                <div>
                  <Label htmlFor="translation_value">Giá trị</Label>
                  <Input
                    value={newTranslation.translation_value}
                    onChange={(e) => setNewTranslation(prev => ({ ...prev, translation_value: e.target.value }))}
                    placeholder="Mục menu"
                  />
                </div>
              </div>
              <Button onClick={handleAddTranslation} disabled={addTranslationMutation.isPending}>
                <Plus size={16} className="mr-2" />
                Thêm bản dịch
              </Button>
            </CardContent>
          </Card>

          {/* Filter and list translations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Danh sách bản dịch</CardTitle>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTranslations.map((translation) => (
                  <div key={translation.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Ngôn ngữ</Label>
                        <Badge variant="secondary">
                          {languages.find(l => l.code === translation.language_code)?.native_name || translation.language_code}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Danh mục</Label>
                        <Badge variant="outline">{translation.category}</Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Khóa</Label>
                        <p className="text-sm font-mono">{translation.translation_key}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Giá trị</Label>
                        {editingTranslation?.id === translation.id ? (
                          <Textarea
                            value={editingTranslation.translation_value}
                            onChange={(e) => setEditingTranslation(prev => prev ? { ...prev, translation_value: e.target.value } : null)}
                            className="min-h-[60px]"
                          />
                        ) : (
                          <p className="text-sm">{translation.translation_value}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {editingTranslation?.id === translation.id ? (
                        <>
                          <Button size="sm" onClick={handleUpdateTranslation} disabled={updateTranslationMutation.isPending}>
                            <Save size={16} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingTranslation(null)}>
                            <X size={16} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => setEditingTranslation(translation)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => deleteTranslationMutation.mutate(translation.id)}
                            disabled={deleteTranslationMutation.isPending}
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

        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách ngôn ngữ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{language.native_name}</p>
                        <p className="text-sm text-muted-foreground">{language.name} ({language.code})</p>
                      </div>
                      {language.is_default && (
                        <Badge>Mặc định</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${language.id}`} className="text-sm">
                          Kích hoạt
                        </Label>
                        <Switch
                          id={`active-${language.id}`}
                          checked={language.is_active}
                          onCheckedChange={(checked) => 
                            toggleLanguageMutation.mutate({ id: language.id, is_active: checked })
                          }
                          disabled={toggleLanguageMutation.isPending}
                        />
                      </div>
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

export default LanguageManagement;