import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, X } from "lucide-react";
// Remove unused import

interface NewsPageContent {
  id?: string;
  language: string;
  title: string;
  description: string;
  banner_image: string;
  meta_title: string;
  meta_description: string;
  updated_at?: string;
}

const NewsPageManagement = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();
  // Remove unused variable
  const [activeTab, setActiveTab] = useState("vi");

  const [newsPageData, setNewsPageData] = useState<Record<string, NewsPageContent>>({
    vi: {
      language: "vi",
      title: "Tin tức",
      description: "Cập nhật những tin tức mới nhất từ công ty",
      banner_image: "",
      meta_title: "Tin tức - IMV Corporation",
      meta_description: "Theo dõi những tin tức, sự kiện và cập nhật mới nhất từ IMV Corporation"
    },
    en: {
      language: "en",
      title: "News",
      description: "Stay updated with the latest news from our company",
      banner_image: "",
      meta_title: "News - IMV Corporation",
      meta_description: "Follow the latest news, events and updates from IMV Corporation"
    }
  });

  useEffect(() => {
    loadNewsPageContent();
  }, []);

  const loadNewsPageContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('setting_key', ['news_page_vi', 'news_page_en']);

      if (error) throw error;

      if (data) {
        const updatedData = { ...newsPageData };
        data.forEach(item => {
          if (item.setting_key === 'news_page_vi' && item.setting_value) {
            updatedData.vi = { ...updatedData.vi, ...JSON.parse(item.setting_value as string) };
          } else if (item.setting_key === 'news_page_en' && item.setting_value) {
            updatedData.en = { ...updatedData.en, ...JSON.parse(item.setting_value as string) };
          }
        });
        setNewsPageData(updatedData);
      }
    } catch (error) {
      console.error('Error loading news page content:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải nội dung trang tin tức",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `news-page-banner-${Date.now()}.${fileExt}`;
    const filePath = `news-page/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, lang: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      setNewsPageData(prev => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          banner_image: imageUrl
        }
      }));
      toast({
        title: "Thành công",
        description: "Upload hình ảnh thành công"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể upload hình ảnh",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInputChange = (lang: string, field: keyof NewsPageContent, value: string) => {
    setNewsPageData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save Vietnamese content
      const { error: viError } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'news_page_vi',
          setting_value: JSON.stringify(newsPageData.vi),
          setting_type: 'page_content',
          display_name: 'News Page Vietnamese',
          category: 'pages'
        });

      if (viError) throw viError;

      // Save English content
      const { error: enError } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'news_page_en',
          setting_value: JSON.stringify(newsPageData.en),
          setting_type: 'page_content',
          display_name: 'News Page English',
          category: 'pages'
        });

      if (enError) throw enError;

      toast({
        title: "Thành công",
        description: "Đã lưu cài đặt trang tin tức"
      });
    } catch (error) {
      console.error('Error saving news page content:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu cài đặt trang tin tức",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const removeBannerImage = (lang: string) => {
    setNewsPageData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        banner_image: ""
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý trang tin tức</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>

        <TabsContent value="vi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nội dung trang tin tức (Tiếng Việt)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="vi-title">Tiêu đề trang</Label>
                <Input
                  id="vi-title"
                  value={newsPageData.vi.title}
                  onChange={(e) => handleInputChange("vi", "title", e.target.value)}
                  placeholder="Nhập tiêu đề trang tin tức"
                />
              </div>

              <div>
                <Label htmlFor="vi-description">Mô tả trang</Label>
                <Textarea
                  id="vi-description"
                  value={newsPageData.vi.description}
                  onChange={(e) => handleInputChange("vi", "description", e.target.value)}
                  placeholder="Nhập mô tả cho trang tin tức"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="vi-banner">Banner trang</Label>
                <div className="space-y-2">
                  {newsPageData.vi.banner_image && (
                    <div className="relative inline-block">
                      <img
                        src={newsPageData.vi.banner_image}
                        alt="Banner"
                        className="h-32 w-auto rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2"
                        onClick={() => removeBannerImage("vi")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div>
                    <Input
                      id="vi-banner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "vi")}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang upload...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="vi-meta-title">Meta Title (SEO)</Label>
                <Input
                  id="vi-meta-title"
                  value={newsPageData.vi.meta_title}
                  onChange={(e) => handleInputChange("vi", "meta_title", e.target.value)}
                  placeholder="Nhập meta title cho SEO"
                />
              </div>

              <div>
                <Label htmlFor="vi-meta-description">Meta Description (SEO)</Label>
                <Textarea
                  id="vi-meta-description"
                  value={newsPageData.vi.meta_description}
                  onChange={(e) => handleInputChange("vi", "meta_description", e.target.value)}
                  placeholder="Nhập meta description cho SEO"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>News Page Content (English)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="en-title">Page Title</Label>
                <Input
                  id="en-title"
                  value={newsPageData.en.title}
                  onChange={(e) => handleInputChange("en", "title", e.target.value)}
                  placeholder="Enter news page title"
                />
              </div>

              <div>
                <Label htmlFor="en-description">Page Description</Label>
                <Textarea
                  id="en-description"
                  value={newsPageData.en.description}
                  onChange={(e) => handleInputChange("en", "description", e.target.value)}
                  placeholder="Enter description for news page"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="en-banner">Page Banner</Label>
                <div className="space-y-2">
                  {newsPageData.en.banner_image && (
                    <div className="relative inline-block">
                      <img
                        src={newsPageData.en.banner_image}
                        alt="Banner"
                        className="h-32 w-auto rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2"
                        onClick={() => removeBannerImage("en")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div>
                    <Input
                      id="en-banner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "en")}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="en-meta-title">Meta Title (SEO)</Label>
                <Input
                  id="en-meta-title"
                  value={newsPageData.en.meta_title}
                  onChange={(e) => handleInputChange("en", "meta_title", e.target.value)}
                  placeholder="Enter meta title for SEO"
                />
              </div>

              <div>
                <Label htmlFor="en-meta-description">Meta Description (SEO)</Label>
                <Textarea
                  id="en-meta-description"
                  value={newsPageData.en.meta_description}
                  onChange={(e) => handleInputChange("en", "meta_description", e.target.value)}
                  placeholder="Enter meta description for SEO"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsPageManagement;