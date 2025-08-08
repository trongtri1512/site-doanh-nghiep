import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'brand';
  slug: string;
  category?: string;
  excerpt?: string;
  image_url?: string;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentLanguage } = useLanguage();
  
  const query = searchParams.get('q') || '';
  const getLanguagePrefix = () => currentLanguage === 'en' ? '/en' : '';

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Search in news
        const { data: newsData } = await supabase
          .from('news')
          .select('id, title, content, slug, category, excerpt, image_url')
          .eq('status', 'published')
          .eq('language_code', currentLanguage)
          .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`);

        // Search in brands
        const { data: brandsData } = await supabase
          .from('brands')
          .select('id, name, description, slug, category, image_url')
          .eq('active', true)
          .eq('language_code', currentLanguage)
          .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`);

        const searchResults: SearchResult[] = [
          ...(newsData || []).map(item => ({
            id: item.id,
            title: item.title,
            content: item.excerpt || item.content?.substring(0, 200) + '...',
            type: 'news' as const,
            slug: item.slug,
            category: item.category,
            image_url: item.image_url
          })),
          ...(brandsData || []).map(item => ({
            id: item.id,
            title: item.name,
            content: item.description,
            type: 'brand' as const,
            slug: item.slug,
            category: item.category,
            image_url: item.image_url
          }))
        ];

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, currentLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SearchIcon size={24} className="text-muted-foreground" />
              <h1 className="text-2xl font-bold">
                {currentLanguage === 'en' ? 'Search Results' : 'Kết quả tìm kiếm'}
              </h1>
            </div>
            
            {query && (
              <p className="text-muted-foreground">
                {currentLanguage === 'en' 
                  ? `Showing results for: "${query}"` 
                  : `Hiển thị kết quả cho: "${query}"`
                }
              </p>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage === 'en' 
                  ? `Found ${results.length} result${results.length > 1 ? 's' : ''}` 
                  : `Tìm thấy ${results.length} kết quả`
                }
              </p>
              
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          <Link 
                            to={`${getLanguagePrefix()}/${result.type === 'news' ? 'news' : 'brands'}/${result.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {result.title}
                          </Link>
                        </CardTitle>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {result.type === 'news' 
                              ? (currentLanguage === 'en' ? 'News' : 'Tin tức')
                              : (currentLanguage === 'en' ? 'Brand' : 'Thương hiệu')
                            }
                          </Badge>
                          {result.category && (
                            <Badge variant="outline">
                              {result.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {result.image_url && (
                        <img 
                          src={result.image_url} 
                          alt={result.title}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {result.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <SearchIcon size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {currentLanguage === 'en' ? 'No results found' : 'Không tìm thấy kết quả'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'en' 
                  ? 'Try different keywords or check your spelling' 
                  : 'Thử từ khóa khác hoặc kiểm tra lại chính tả'
                }
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {currentLanguage === 'en' ? 'Enter a search term' : 'Nhập từ khóa tìm kiếm'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'en' 
                  ? 'Search for news, brands, and content' 
                  : 'Tìm kiếm tin tức, thương hiệu và nội dung'
                }
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;