import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    if (slug) {
      loadArticle();
      loadRelatedNews();
    }
  }, [slug, currentLanguage]);

  const loadArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .eq('language_code', currentLanguage)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .eq('language_code', currentLanguage)
        .neq('slug', slug)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedNews(data || []);
    } catch (error) {
      console.error('Error loading related news:', error);
    }
  };

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

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">{t('news.not_found_title', 'Không tìm thấy bài viết')}</h1>
            <Link to={currentLanguage === 'en' ? '/en/news' : '/news'} className="text-primary hover:underline">
              {t('news.not_found_link', 'Quay lại trang tin tức')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to={currentLanguage === 'en' ? '/en/news' : '/news'} className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          {t('news.back_to_news', 'Quay lại tin tức')}
        </Link>
        
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>
              {article.featured && (
                <Badge className="ml-2">
                  {t('news.featured_badge', 'Nổi bật')}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {article.published_at 
                    ? new Date(article.published_at).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : t('news.no_date', 'Chưa đặt ngày')
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>
                  {new Date(article.created_at).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="mb-8">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {article.content || t('news.content_placeholder', 'Nội dung bài viết đang được cập nhật...')}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="border-t border-border pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('news.category_label', 'Danh mục:')}</span>
                <Badge variant="outline">{article.category}</Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{t('news.share_label', 'Chia sẻ:')}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="px-3 py-1 bg-blue-400 text-white text-sm rounded hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                  <button className="px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">{t('news.related_articles', 'Bài viết liên quan')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={currentLanguage === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image_url || "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {item.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.published_at ? new Date(item.published_at).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US') : t('news.no_date', 'Chưa đặt')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;