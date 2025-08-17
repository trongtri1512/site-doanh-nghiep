import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, ExternalLink, Languages, CheckCircle, AlertTriangle } from 'lucide-react';
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
      const relatedArticleId = (current as any)?.related_article_id;
      if (relatedArticleId) {
        const { data: related, error: relatedError } = await supabase
          .from('news')
          .select('id, title, slug, language_code')
          .eq('id', relatedArticleId)
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
  
  const getLanguageColor = (langCode: string) => {
    return langCode === 'vi' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white';
  };

  const getLanguageName = (langCode: string) => {
    return langCode === 'vi' ? 'Tiếng Việt' : 'English';
  };

  return (
    <Card className="mb-6 border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">
                {t('article.available_languages', 'Ngôn ngữ khả dụng')}
              </span>
            </div>
            
            <Badge className={`${getLanguageColor(currentLanguage)} font-medium`}>
              <CheckCircle className="h-3 w-3 mr-1" />
              {getLanguageName(currentLanguage)}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {otherLanguages.map((language) => {
              const hasTranslation = relatedArticle && relatedArticle.language_code === language.code;
              
              return (
                <Button
                  key={language.code}
                  variant={hasTranslation ? "default" : "outline"}
                  size="sm"
                  className={`
                    ${hasTranslation 
                      ? `${getLanguageColor(language.code)} hover:opacity-90` 
                      : 'border-dashed opacity-60 hover:opacity-80'
                    }
                    transition-all duration-200
                  `}
                  onClick={() => handleLanguageSwitch(language.code)}
                  disabled={!hasTranslation}
                >
                  {hasTranslation ? (
                    <div className="flex items-center gap-1">
                      <span>{getLanguageName(language.code)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{getLanguageName(language.code)}</span>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Translation Status Info */}
        <div className="mt-3 pt-3 border-t border-border/50">
          {relatedArticle ? (
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>
                {t('article.translation_available', 'Bài viết có sẵn bản dịch:')} 
                <span className="font-medium ml-1">"{relatedArticle.title}"</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>{t('article.no_translation', 'Bài viết này chưa có bản dịch cho ngôn ngữ khác')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleLanguageSwitcher;