import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  id?: string;
  site_title: string;
  site_description: string;
  logo_url: string;
  favicon_url: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  contact_email: string;
  contact_phone: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: "",
    site_description: "",
    logo_url: "",
    favicon_url: "",
    maintenance_mode: false,
    maintenance_message: "",
    contact_email: "",
    contact_phone: "",
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải cài đặt website",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    const setUploading = type === 'logo' ? setUploadingLogo : setUploadingFavicon;
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      handleInputChange(type === 'logo' ? 'logo_url' : 'favicon_url', publicUrl);

      toast({
        title: "Thành công",
        description: `${type === 'logo' ? 'Logo' : 'Favicon'} đã được tải lên`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Lỗi",
        description: `Không thể tải lên ${type === 'logo' ? 'logo' : 'favicon'}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(settings);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Cài đặt website đã được lưu",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu cài đặt",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt Website</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt chung của website
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>
              Cài đặt tiêu đề và mô tả website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_title">Tiêu đề website</Label>
              <Input
                id="site_title"
                value={settings.site_title}
                onChange={(e) => handleInputChange('site_title', e.target.value)}
                placeholder="Nhập tiêu đề website"
              />
            </div>
            <div>
              <Label htmlFor="site_description">Mô tả website</Label>
              <Textarea
                id="site_description"
                value={settings.site_description}
                onChange={(e) => handleInputChange('site_description', e.target.value)}
                placeholder="Nhập mô tả website"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Thương hiệu</CardTitle>
            <CardDescription>
              Logo và favicon của website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                {settings.logo_url && (
                  <img 
                    src={settings.logo_url} 
                    alt="Logo" 
                    className="h-12 w-auto object-contain border rounded"
                  />
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'logo');
                    }}
                    disabled={uploadingLogo}
                  />
                  {uploadingLogo && <Loader2 className="h-4 w-4 animate-spin mt-2" />}
                </div>
              </div>
            </div>
            <div>
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                {settings.favicon_url && (
                  <img 
                    src={settings.favicon_url} 
                    alt="Favicon" 
                    className="h-8 w-8 object-contain border rounded"
                  />
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'favicon');
                    }}
                    disabled={uploadingFavicon}
                  />
                  {uploadingFavicon && <Loader2 className="h-4 w-4 animate-spin mt-2" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Chế độ bảo trì</CardTitle>
            <CardDescription>
              Kích hoạt chế độ bảo trì cho website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="maintenance_mode"
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) => handleInputChange('maintenance_mode', checked)}
              />
              <Label htmlFor="maintenance_mode">Kích hoạt chế độ bảo trì</Label>
            </div>
            <div>
              <Label htmlFor="maintenance_message">Thông báo bảo trì</Label>
              <Textarea
                id="maintenance_message"
                value={settings.maintenance_message}
                onChange={(e) => handleInputChange('maintenance_message', e.target.value)}
                placeholder="Nhập thông báo hiển thị khi website bảo trì"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
            <CardDescription>
              Email và số điện thoại liên hệ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contact_email">Email liên hệ</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="Nhập email liên hệ"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Số điện thoại</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
            <CardDescription>
              Liên kết đến các trang mạng xã hội
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="social_facebook">Facebook</Label>
              <Input
                id="social_facebook"
                value={settings.social_facebook}
                onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label htmlFor="social_twitter">Twitter</Label>
              <Input
                id="social_twitter"
                value={settings.social_twitter}
                onChange={(e) => handleInputChange('social_twitter', e.target.value)}
                placeholder="https://twitter.com/youraccount"
              />
            </div>
            <div>
              <Label htmlFor="social_instagram">Instagram</Label>
              <Input
                id="social_instagram"
                value={settings.social_instagram}
                onChange={(e) => handleInputChange('social_instagram', e.target.value)}
                placeholder="https://instagram.com/youraccount"
              />
            </div>
            <div>
              <Label htmlFor="social_linkedin">LinkedIn</Label>
              <Input
                id="social_linkedin"
                value={settings.social_linkedin}
                onChange={(e) => handleInputChange('social_linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving} className="w-full">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Lưu cài đặt
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Settings;