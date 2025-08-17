import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Link2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RelatedArticleSelectorProps {
  currentLanguage: string;
  currentArticleId?: string;
  relatedArticleId?: string;
  onRelatedArticleChange: (articleId: string) => void;
  onCreateRelated?: () => void;
}

interface Article {
  id: string;
  title: string;
  language_code: string;
  status: string;
  created_at: string;
}

const RelatedArticleSelector: React.FC<RelatedArticleSelectorProps> = ({
  currentLanguage,
  currentArticleId,
  relatedArticleId,
  onRelatedArticleChange,
  onCreateRelated
}) => {
  const [availableArticles, setAvailableArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [relatedArticle, setRelatedArticle] = useState<Article | null>(null);
  const { toast } = useToast();

  const otherLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
  const otherLanguageName = currentLanguage === 'vi' ? 'English' : 'Tiếng Việt';

  useEffect(() => {
    loadAvailableArticles();
    if (relatedArticleId) {
      loadRelatedArticle();
    }
  }, [currentLanguage, relatedArticleId]);

  const loadAvailableArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('id, title, language_code, status, created_at')
        .eq('language_code', otherLanguage)
        .neq('id', currentArticleId || '')
        .is('related_article_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAvailableArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedArticle = async () => {
    if (!relatedArticleId) return;
    
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, language_code, status, created_at')
        .eq('id', relatedArticleId)
        .single();

      if (error) throw error;
      setRelatedArticle(data);
    } catch (error) {
      console.error('Error loading related article:', error);
    }
  };

  const handleUnlink = async () => {
    if (!currentArticleId || !relatedArticleId) return;

    try {
      // Remove the link from both articles
      const { error: error1 } = await supabase
        .from('news')
        .update({ related_article_id: null })
        .eq('id', currentArticleId);

      const { error: error2 } = await supabase
        .from('news')
        .update({ related_article_id: null })
        .eq('id', relatedArticleId);

      if (error1 || error2) throw error1 || error2;

      setRelatedArticle(null);
      onRelatedArticleChange('');
      loadAvailableArticles();
      
      toast({
        title: "Thành công",
        description: "Đã hủy liên kết bài viết"
      });
    } catch (error) {
      console.error('Error unlinking articles:', error);
      toast({
        title: "Lỗi",
        description: "Không thể hủy liên kết bài viết",
        variant: "destructive"
      });
    }
  };

  if (relatedArticle) {
    return (
      <div className="space-y-2">
        <Label>Bài viết {otherLanguageName} tương ứng</Label>
        <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
          <Link2 className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">{relatedArticle.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {relatedArticle.language_code === 'vi' ? 'Tiếng Việt' : 'English'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {relatedArticle.status === 'published' ? 'Đã xuất bản' : 
                 relatedArticle.status === 'draft' ? 'Bản nháp' : 'Lên lịch'}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUnlink}>
            Hủy liên kết
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`/admin/news/edit/${relatedArticle.id}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Bài viết {otherLanguageName} tương ứng</Label>
      <div className="space-y-2">
        <Select 
          value={relatedArticleId || ''} 
          onValueChange={onRelatedArticleChange}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Chọn bài viết ${otherLanguageName} liên kết`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">-- Không liên kết --</SelectItem>
            {availableArticles.map((article) => (
              <SelectItem key={article.id} value={article.id}>
                <div className="flex items-center gap-2">
                  <span>{article.title}</span>
                  <Badge variant="outline" className="text-xs ml-auto">
                    {article.status === 'published' ? 'Đã xuất bản' : 
                     article.status === 'draft' ? 'Bản nháp' : 'Lên lịch'}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {onCreateRelated && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCreateRelated}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo bài viết {otherLanguageName} mới
          </Button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        Liên kết bài viết này với phiên bản {otherLanguageName} để người dùng có thể chuyển đổi ngôn ngữ dễ dàng.
      </p>
    </div>
  );
};

export default RelatedArticleSelector;