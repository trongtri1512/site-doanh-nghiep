import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Upload, SettingsIcon, Palette, Wrench, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: string;
  display_name: string;
  description: string;
  category: string;
  display_order: number;
  is_public: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("category", { ascending: true })
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      setSettings(data || []);
      
      // Initialize form data with current values
      const initialData: Record<string, any> = {};
      data?.forEach(setting => {
        if (setting.setting_type === 'boolean') {
          initialData[setting.setting_key] = setting.setting_value === true;
        } else if (setting.setting_type === 'select') {
          // For select type, extract the value from the JSON structure
          const selectValue = setting.setting_value as any;
          initialData[setting.setting_key] = selectValue?.value || '';
        } else {
          initialData[setting.setting_key] = typeof setting.setting_value === 'string' 
            ? setting.setting_value.replace(/^"|"$/g, '') 
            : setting.setting_value;
        }
      });
      setFormData(initialData);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải cài đặt website",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) => {
        const setting = settings.find(s => s.setting_key === key);
        if (!setting) return null;

        let processedValue;
        if (setting.setting_type === 'boolean') {
          processedValue = value;
        } else if (setting.setting_type === 'number') {
          processedValue = Number(value);
        } else if (setting.setting_type === 'select') {
          // For select type, preserve the original structure with updated value
          processedValue = { ...setting.setting_value, value };
        } else {
          processedValue = `"${value}"`;
        }

        return {
          setting_key: key,
          setting_value: processedValue,
        };
      }).filter(Boolean);

      // Update settings one by one
      for (const update of updates) {
        if (!update) continue;
        const { error } = await supabase
          .from("site_settings")
          .update({ setting_value: update.setting_value })
          .eq("setting_key", update.setting_key);

        if (error) throw error;
      }

      toast({
        title: "Thành công",
        description: "Đã lưu cài đặt website thành công",
      });
      
      fetchSettings(); // Refresh data
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu cài đặt",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageUpload = async (key: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${key}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      handleInputChange(key, publicUrl);
      
      toast({
        title: "Thành công",
        description: "Tải ảnh lên thành công",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tải ảnh lên",
        variant: "destructive",
      });
    }
  };

  const renderSettingInput = (setting: SiteSetting) => {
    const value = formData[setting.setting_key] || '';

    switch (setting.setting_type) {
      case 'select':
        const selectValue = setting.setting_value as any;
        const options = selectValue?.options || [];
        return (
          <div className="space-y-2">
            <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
            <Select value={value} onValueChange={(newValue) => handleInputChange(setting.setting_key, newValue)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn một tùy chọn" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {setting.description && (
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={setting.setting_key}
              checked={value === true}
              onCheckedChange={(checked) => handleInputChange(setting.setting_key, checked)}
            />
            <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={setting.setting_key}
                value={value}
                onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                placeholder="URL ảnh hoặc tải lên file"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(setting.setting_key, file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {value && (
              <img
                src={value}
                alt={setting.display_name}
                className="w-16 h-16 object-contain border rounded"
              />
            )}
            {setting.description && (
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            )}
          </div>
        );

      case 'text':
      default:
        if (setting.setting_key.includes('message') || setting.setting_key.includes('description')) {
          return (
            <div className="space-y-2">
              <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
              <Textarea
                id={setting.setting_key}
                value={value}
                onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                placeholder={setting.description}
                rows={3}
              />
              {setting.description && (
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              )}
            </div>
          );
        } else {
          return (
            <div className="space-y-2">
              <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
              <Input
                id={setting.setting_key}
                value={value}
                onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                placeholder={setting.description}
              />
              {setting.description && (
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              )}
            </div>
          );
        }
    }
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appearance': return <Palette className="h-4 w-4" />;
      case 'maintenance': return <Wrench className="h-4 w-4" />;
      case 'seo': return <TrendingUp className="h-4 w-4" />;
      default: return <SettingsIcon className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general': return 'Cài đặt chung';
      case 'appearance': return 'Giao diện';
      case 'maintenance': return 'Bảo trì';
      case 'seo': return 'SEO & Analytics';
      case 'menu': return 'Menu';
      default: return category;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cài đặt Website</h1>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className={`grid w-full grid-cols-${Object.keys(groupedSettings).length}`}>
          {Object.keys(groupedSettings).map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center gap-2"
            >
              {getCategoryIcon(category)}
              {getCategoryLabel(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {getCategoryLabel(category)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {categorySettings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    {setting.setting_type === 'boolean' ? (
                      renderSettingInput(setting)
                    ) : (
                      <div>
                        {renderSettingInput(setting)}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={setting.is_public ? "default" : "secondary"} className="text-xs">
                            {setting.is_public ? "Công khai" : "Riêng tư"}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Settings;