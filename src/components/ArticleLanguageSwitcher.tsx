import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  language_code: string;
}

const ArticleLanguageSwitcher = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentLanguage, availableLanguages, t } = useLanguage();
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [relatedArticle, setRelatedArticle] = useState<RelatedArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadCurrentArticle();
    }
  }, [slug, currentLanguage]);

  const loadCurrentArticle = async () => {
    try {
      setLoading(true);
      
      // Load current article
      const { data: current, error: currentError } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('language_code', currentLanguage)
        .eq('status', 'published')
        .single();

      if (currentError) throw currentError;
      setCurrentArticle(current);

      // If current article has related_article_id, load the related article
      if (current?.related_article_id) {
        const { data: related, error: relatedError } = await supabase
          .from('news')
          .select('id, title, slug, language_code')
          .eq('id', current.related_article_id)
          .eq('status', 'published')
          .single();

        if (!relatedError && related) {
          setRelatedArticle(related);
        }
      } else {
        // Check if any article has this article as related_article_id
        const { data: relatedByOthers, error: relatedByOthersError } = await supabase
          .from('news')
          .select('id, title, slug, language_code')
          .eq('related_article_id', current?.id)
          .eq('status', 'published')
          .limit(1);

        if (!relatedByOthersError && relatedByOthers && relatedByOthers.length > 0) {
          setRelatedArticle(relatedByOthers[0]);
        }
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSwitch = (targetLanguage: string) => {
    if (relatedArticle && relatedArticle.language_code === targetLanguage) {
      // Navigate to related article
      const path = targetLanguage === 'en' ? `/en/news/${relatedArticle.slug}` : `/news/${relatedArticle.slug}`;
      navigate(path);
    } else {
      // Navigate to home page in target language with notice
      const path = targetLanguage === 'en' ? '/en' : '/';
      navigate(path);
    }
  };

  if (loading || !currentArticle) {
    return null;
  }

  const otherLanguages = availableLanguages.filter(lang => lang.code !== currentLanguage);

  return (
    <div className="flex items-center gap-2 mb-4">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        {t('article.available_languages', 'Ngôn ngữ khả dụng:')}
      </span>
      
      <Badge variant="default" className="text-xs">
        {currentLanguage.toUpperCase()}
      </Badge>

      {otherLanguages.map((language) => {
        const hasTranslation = relatedArticle && relatedArticle.language_code === language.code;
        
        return (
          <Button
            key={language.code}
            variant={hasTranslation ? "outline" : "ghost"}
            size="sm"
            className="text-xs h-6 px-2"
            onClick={() => handleLanguageSwitch(language.code)}
            disabled={!hasTranslation}
          >
            <span className={hasTranslation ? '' : 'line-through opacity-50'}>
              {language.code.toUpperCase()}
            </span>
            {hasTranslation && <ExternalLink className="h-3 w-3 ml-1" />}
          </Button>
        );
      })}

      {relatedArticle && (
        <span className="text-xs text-muted-foreground ml-2">
          {t('article.translation_available', 'Có bản dịch')}
        </span>
      )}
      
      {!relatedArticle && (
        <span className="text-xs text-muted-foreground ml-2">
          {t('article.no_translation', 'Chưa có bản dịch')}
        </span>
      )}
    </div>
  );
};

export default ArticleLanguageSwitcher;