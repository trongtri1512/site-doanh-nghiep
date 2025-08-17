import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, X, Globe, Link2, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RelatedArticleSelectorProps {
  currentArticleId?: string;
  relatedArticleId?: string;
  onRelatedArticleChange: (articleId: string | null) => void;
  currentLanguage: string;
}

interface Article {
  id: string;
  title: string;
  language_code: string;
  status: string;
  category: string;
}

const RelatedArticleSelector = ({
  currentArticleId,
  relatedArticleId,
  onRelatedArticleChange,
  currentLanguage
}: RelatedArticleSelectorProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [relatedArticle, setRelatedArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRelatedArticle();
  }, [relatedArticleId]);

  const loadRelatedArticle = async () => {
    if (!relatedArticleId) {
      setRelatedArticle(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', relatedArticleId)
        .single();

      if (error) throw error;
      setRelatedArticle(data);
    } catch (error) {
      console.error('Error loading related article:', error);
    }
  };

  const searchArticles = async (query: string) => {
    if (!query) {
      setArticles([]);
      return;
    }

    setLoading(true);
    try {
      let queryBuilder = supabase
        .from('news')
        .select('id, title, language_code, status, category')
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (currentArticleId) {
        queryBuilder = queryBuilder.neq('id', currentArticleId);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };


  const removeRelatedArticle = () => {
    setRelatedArticle(null);
    onRelatedArticleChange(null);
  };

  const getLanguageColor = (langCode: string) => {
    return langCode === 'vi' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'draft': return <AlertCircle className="h-3 w-3 text-yellow-600" />;
      default: return <AlertCircle className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary" />
          <Label className="text-base font-semibold">Liên kết đa ngôn ngữ</Label>
        </div>
        
        {relatedArticle ? (
          <div className="space-y-4">
            {/* Visual Connection Diagram */}
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Badge className={`${getLanguageColor(currentLanguage)} mb-2`}>
                    {currentLanguage.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Bài viết hiện tại</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary"></div>
                  <Link2 className="h-4 w-4 text-primary mx-1" />
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
                
                <div className="text-center">
                  <Badge className={`${getLanguageColor(relatedArticle.language_code)} mb-2`}>
                    {relatedArticle.language_code.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Bài viết liên kết</p>
                </div>
              </div>
            </div>

            {/* Connected Article Details */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge className={getLanguageColor(relatedArticle.language_code)}>
                    {relatedArticle.language_code.toUpperCase()}
                  </Badge>
                  {getStatusIcon(relatedArticle.status)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{relatedArticle.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{relatedArticle.category}</span>
                    <span className="capitalize">{relatedArticle.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/news/edit/${relatedArticle.id}`)}
                  className="hover:bg-primary/10"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeRelatedArticle}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Relationship Status */}
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                Liên kết thành công với bài viết "{relatedArticle.title}" ({relatedArticle.language_code.toUpperCase()})
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Search Interface */}
            <div className="relative">
              <Select onValueChange={(value) => {
                const article = articles.find(a => a.id === value);
                if (article) {
                  setRelatedArticle(article);
                  onRelatedArticleChange(value);
                }
              }}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="🔍 Tìm kiếm bài viết để liên kết..." />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <div className="p-3 border-b">
                    <input
                      type="text"
                      placeholder="Nhập tiêu đề bài viết..."
                      className="w-full p-2 border rounded bg-background"
                      onChange={(e) => searchArticles(e.target.value)}
                    />
                  </div>
                  {loading && (
                    <div className="p-3 text-center text-muted-foreground">
                      Đang tìm kiếm...
                    </div>
                  )}
                  {articles.length === 0 && !loading && (
                    <div className="p-3 text-center text-muted-foreground">
                      Không tìm thấy bài viết nào
                    </div>
                  )}
                  {articles.map((article) => (
                    <SelectItem key={article.id} value={article.id} className="hover:bg-muted/50">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getLanguageColor(article.language_code)} text-xs`}>
                            {article.language_code.toUpperCase()}
                          </Badge>
                          {getStatusIcon(article.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">{article.title}</p>
                          <p className="text-xs text-muted-foreground">{article.category}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            {/* No Link Status */}
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Bài viết này chưa được liên kết với ngôn ngữ khác
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedArticleSelector;