import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Globe, AlertCircle, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ArticleLanguageSwitcherProps {
  articleId?: string;
  articleSlug?: string;
}

const ArticleLanguageSwitcher: React.FC<ArticleLanguageSwitcherProps> = ({ 
  articleId, 
  articleSlug 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const [relatedArticle, setRelatedArticle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showNoTranslation, setShowNoTranslation] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);
  const isNewsPage = location.pathname.includes('/news/');

  useEffect(() => {
    if (articleId) {
      loadRelatedArticle();
    }
  }, [articleId, currentLanguage]);

  const loadRelatedArticle = async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('related_article_id')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      if (data?.related_article_id) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('news')
          .select('id, slug, title, language_code, status')
          .eq('id', data.related_article_id)
          .single();

        if (relatedError) throw relatedError;
        setRelatedArticle(relatedData);
      }
    } catch (error) {
      console.error('Error loading related article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSwitch = async (targetLanguage: string) => {
    // If not on a news page or no article context, just switch language normally
    if (!isNewsPage || !articleId) {
      setLanguage(targetLanguage);
      return;
    }

    // If there's a related article in the target language, navigate to it
    if (relatedArticle && relatedArticle.language_code === targetLanguage) {
      navigate(`/news/${relatedArticle.slug}`);
      setLanguage(targetLanguage);
      return;
    }

    // No related article found, show message
    setShowNoTranslation(true);
    setTimeout(() => setShowNoTranslation(false), 5000);
  };

  const handleCreateTranslation = () => {
    if (user && articleId) {
      const targetLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
      window.open(`/admin/news/create?lang=${targetLanguage}&related_id=${articleId}`, '_blank');
    }
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 gap-1"
          >
            <Globe size={16} />
            {currentLang?.native_name || 'Tiếng Việt'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageSwitch(language.code)}
              className={currentLanguage === language.code ? 'bg-muted' : ''}
              disabled={loading}
            >
              {language.native_name}
              {isNewsPage && relatedArticle && relatedArticle.language_code === language.code && (
                <span className="ml-2 text-xs text-green-600">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {showNoTranslation && (
        <div className="absolute top-full right-0 mt-2 w-80 z-50">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-sm">
                  Chưa có bài viết cho ngôn ngữ này, xin vui lòng liên hệ người quản trị website hoặc bộ phận liên quan.
                </p>
                {user && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCreateTranslation}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài viết cho ngôn ngữ này
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ArticleLanguageSwitcher;