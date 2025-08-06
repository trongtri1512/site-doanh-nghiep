import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedNews();
  }, []);

  const loadFeaturedNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Tin tức mới nhất</h2>
          <div className="text-center py-8">Đang tải...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Tin tức mới nhất</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={item.id || index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image_url || "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=250&fit=crop"} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{item.category}</div>
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{item.excerpt}</p>
                <Link to={`/news/${item.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Đọc thêm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/news">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              Xem tất cả tin tức
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;