import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink, X } from 'lucide-react';
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

  const handleCreateRelatedArticle = () => {
    if (currentArticleId) {
      // Navigate to create new article with related_id parameter
      const targetLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
      navigate(`/admin/news/create?related_id=${currentArticleId}&lang=${targetLanguage}`);
    }
  };

  const removeRelatedArticle = () => {
    setRelatedArticle(null);
    onRelatedArticleChange(null);
  };

  return (
    <div className="space-y-4">
      <Label>Bài viết liên kết</Label>
      
      {relatedArticle ? (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <Badge variant="outline">{relatedArticle.language_code.toUpperCase()}</Badge>
            <div>
              <p className="font-medium">{relatedArticle.title}</p>
              <p className="text-sm text-muted-foreground">{relatedArticle.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin/news/edit/${relatedArticle.id}`)}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={removeRelatedArticle}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Select onValueChange={(value) => {
            const article = articles.find(a => a.id === value);
            if (article) {
              setRelatedArticle(article);
              onRelatedArticleChange(value);
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Tìm kiếm bài viết để liên kết..." />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full p-2 border rounded"
                  onChange={(e) => searchArticles(e.target.value)}
                />
              </div>
              {articles.map((article) => (
                <SelectItem key={article.id} value={article.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {article.language_code.toUpperCase()}
                    </Badge>
                    <span className="truncate">{article.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentArticleId && (
            <Button
              variant="outline"
              onClick={handleCreateRelatedArticle}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài viết cho ngôn ngữ khác
            </Button>
          )}
        </div>
      )}

      {relatedArticle && (
        <div className="text-sm text-muted-foreground">
          <p>Bài viết này được liên kết với bài viết "{relatedArticle.title}" ({relatedArticle.language_code.toUpperCase()})</p>
        </div>
      )}
    </div>
  );
};

export default RelatedArticleSelector;