import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const News = () => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    loadNews();
    loadCategories();
  }, [currentLanguage]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .like('setting_key', `category_${currentLanguage}_%`)
        .eq('category', 'news_categories')
        .order('display_name', { ascending: true });

      if (error) throw error;
      
      const transformedCategories = [
        { key: "all", label: currentLanguage === 'vi' ? "Tất cả" : "All" },
        ...(data || []).map(item => ({
          key: item.setting_key.replace(`category_${currentLanguage}_`, ''),
          label: item.display_name
        }))
      ];
      
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .eq('language_code', currentLanguage)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsArticles(data || []);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => {
        const selectedCategoryLabel = categories.find(cat => cat.key === selectedCategory)?.label;
        return article.category === selectedCategoryLabel;
      });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center py-16">{t('news.loading', 'Đang tải...')}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to={currentLanguage === 'en' ? '/en' : '/'} className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          {t('news.back_to_home', 'Quay lại trang chủ')}
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('news.page_title', 'Tin tức & Sự kiện')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('news.page_subtitle', 'Cập nhật những thông tin mới nhất về các thương hiệu, sản phẩm và hoạt động của IMV')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.key === selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {filteredArticles.length > 0 && (
            <div className="mb-12">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-3">
                      {t('news.featured', 'Nổi bật')}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {filteredArticles[0].published_at ? new Date(filteredArticles[0].published_at).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'vi-VN') : t('news.no_date', 'Chưa đặt')}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {filteredArticles[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={16} />
                        {filteredArticles[0].category}
                      </span>
                    </div>
                    <Link to={currentLanguage === 'en' ? `/en/news/${filteredArticles[0].slug}` : `/news/${filteredArticles[0].slug}`}>
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        {t('common.read_more', 'Đọc thêm')}
                      </button>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src={filteredArticles[0].image_url || "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"}
                      alt={filteredArticles[0].title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map((article) => (
              <article key={article.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
                <img
                  src={article.image_url || "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.published_at ? new Date(article.published_at).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'vi-VN') : t('news.no_date', 'Chưa đặt')}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </span>
                    </div>
                    <Link to={currentLanguage === 'en' ? `/en/news/${article.slug}` : `/news/${article.slug}`}>
                      <button className="text-primary hover:underline text-sm font-medium">
                        {t('common.read_more', 'Đọc thêm')}
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
              {t('news.load_more', 'Xem thêm tin tức')}
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mt-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t('news.newsletter_title', 'Đăng ký nhận bản tin')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('news.newsletter_subtitle', 'Nhận thông tin mới nhất về các sản phẩm, thương hiệu và sự kiện của IMV')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('news.newsletter_placeholder', 'Nhập email của bạn')}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                {t('news.newsletter_button', 'Đăng ký')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;