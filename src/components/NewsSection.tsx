import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    loadFeaturedNews();
  }, [currentLanguage]);

  const loadFeaturedNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .eq('language_code', currentLanguage)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-blue-900">{t('news.latest_title', 'Tin tức mới nhất')}</h2>
          <div className="text-center py-8 text-blue-700">{t('common.loading', 'Đang tải...')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-blue-900">{t('news.latest_title', 'Tin tức mới nhất')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <Card key={item.id || index} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image_url || "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=250&fit=crop"} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(item.created_at).toLocaleDateString('vi-VN')} • {item.category}
                </div>
                <Link to={currentLanguage === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`}>
                  <h3 className="text-base font-semibold mb-2 line-clamp-2 flex-1 hover:text-primary transition-colors cursor-pointer">{item.title}</h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{item.excerpt}</p>
                <Link to={currentLanguage === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`} className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    {t('common.read_more', 'Đọc thêm')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={currentLanguage === 'en' ? '/en/news' : '/news'}>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              {t('news.view_all', 'Xem tất cả tin tức')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;