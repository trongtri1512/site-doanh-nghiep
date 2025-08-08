import { ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrandMegaMenuOpen, setIsBrandMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { settings } = useSiteSettings();
  const { t: translate, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  // Helper function to get language prefix for URLs
  const getLanguagePrefix = () => currentLanguage === 'en' ? '/en' : '';
  
  // Helper function to create proper URL with language prefix
  const createUrl = (path: string) => {
    if (path.startsWith('http')) return path; // External URL
    const prefix = getLanguagePrefix();
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
  };

  // Fetch all menu items from database based on current language
  const { data: allMenuItems = [] } = useQuery({
    queryKey: ['menu-items-main', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_type', 'main')
        .eq('is_active', true)
        .eq('language_code', currentLanguage)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch brands for mega menu
  const { data: brands = [] } = useQuery({
    queryKey: ['brands-megamenu', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('active', true)
        .eq('language_code', currentLanguage)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Organize menu items into parent-child structure
  const parentMenuItems = allMenuItems.filter(item => !item.parent_id);
  const childMenuItems = allMenuItems.filter(item => item.parent_id);
  
  const getChildItems = (parentId: string) => {
    return childMenuItems.filter(child => child.parent_id === parentId);
  };

  // Group brands by category for mega menu
  const brandCategories = brands.reduce((acc, brand) => {
    const category = brand.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(brand);
    return acc;
  }, {} as Record<string, typeof brands>);

  // Handle mega menu hover with delay
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    setIsBrandMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setIsBrandMegaMenuOpen(false);
    }, 300); // 300ms delay
    setMegaMenuTimeout(timeout);
  };

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const languagePrefix = getLanguagePrefix();
      navigate(`${languagePrefix}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-primary text-white sticky top-0 z-50">

      {/* Main navigation */}
      <nav className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        <div className="flex items-center">
          <Link to={createUrl('/')}>
            <img 
              src={settings.site_logo || "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png"} 
              alt={`${settings.site_title || "IMV"} Logo`} 
              className="h-10 lg:h-12 w-auto brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {parentMenuItems.map((item) => {
            const children = getChildItems(item.id);
            
            // Special handling for Mega Menu display type
            if (item.display_type === 'megamenu') {
              return (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleMegaMenuEnter}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <Link 
                    to={createUrl(item.url)}
                    className="flex items-center gap-1 hover:underline font-medium text-sm transition-colors py-2"
                  >
                    {item.title}
                    <ChevronDown size={14} className="transition-transform duration-200" />
                  </Link>
                  
                  {/* Mega Menu */}
                  {isBrandMegaMenuOpen && (
                    <div 
                      className="fixed top-[4rem] left-1/2 transform -translate-x-1/2 w-[90vw] max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 lg:p-6 z-50 animate-fade-in overflow-hidden"
                      onMouseEnter={handleMegaMenuEnter}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Featured Brands Column */}
                        <div className="lg:col-span-2">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 lg:mb-6 border-b border-gray-200 pb-2">
                            {currentLanguage === 'en' ? 'Our Brands' : 'Thương hiệu của chúng tôi'} ({brands.length})
                          </h3>
                          {brands.length === 0 ? (
                            <p className="text-gray-500 text-sm">Không có thương hiệu nào</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                              {brands.slice(0, 6).map((brand) => (
                                <Link
                                  key={brand.id}
                                  to={createUrl(`/brands/${brand.slug}`)}
                                  className="group p-3 lg:p-4 rounded-xl border border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 p-2">
                                      <img 
                                        src={brand.image_url || '/placeholder.svg'} 
                                        alt={brand.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm mb-1">
                                        {brand.name}
                                      </h4>
                                      <p className="text-xs text-gray-600 line-clamp-2">
                                        {brand.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                          
                          {/* View All Brands */}
                          <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-200">
                            <Link 
                              to={createUrl('/brands')}
                              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                            >
                              {currentLanguage === 'en' ? 'View All Brands' : 'Xem tất cả thương hiệu'} →
                            </Link>
                          </div>
                        </div>
                        
                        {/* Categories Column */}
                        <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 lg:mb-6 border-b border-gray-200 pb-2">
                            {currentLanguage === 'en' ? 'Categories' : 'Danh mục'}
                          </h3>
                          <div className="space-y-4">
                            {Object.keys(brandCategories).length === 0 ? (
                              <p className="text-gray-500 text-sm">Không có danh mục nào</p>
                            ) : (
                              Object.keys(brandCategories).slice(0, 3).map((category) => (
                                <div key={category} className="group">
                                  <h4 className="font-medium text-gray-700 mb-2 text-sm border-b border-gray-100 pb-1">
                                    {category}
                                  </h4>
                                  <div className="space-y-1">
                                    {brandCategories[category].slice(0, 4).map((brand) => (
                                      <Link
                                        key={brand.id}
                                        to={createUrl(`/brands/${brand.slug}`)}
                                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors py-1 hover:bg-gray-50 px-2 rounded group"
                                      >
                                        <div className="w-4 h-4 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                          <img 
                                            src={brand.image_url || '/placeholder.svg'} 
                                            alt={brand.name}
                                            className="w-full h-full object-contain"
                                          />
                                        </div>
                                        <span className="truncate">{brand.name}</span>
                                      </Link>
                                    ))}
                                    {brandCategories[category].length > 4 && (
                                      <p className="text-xs text-gray-400 px-2 py-1">
                                        +{brandCategories[category].length - 4} thêm
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                            
                            {/* All Categories Link */}
                            <div className="pt-2 border-t border-gray-100">
                              <Link 
                                to={createUrl('/brands')}
                                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                              >
                                {currentLanguage === 'en' ? 'Browse All Categories' : 'Xem tất cả danh mục'} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            
            // Regular dropdown for other menu items
            if (children.length > 0) {
              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger className="flex items-center gap-1 hover:underline font-medium text-sm transition-colors">
                    {item.title}
                    <ChevronDown size={14} className="transition-transform duration-200" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
                    sideOffset={8}
                  >
                    {children.map((child) => (
                      <DropdownMenuItem key={child.id} asChild className="rounded-md">
                        {child.url.startsWith('http') ? (
                          <a 
                            href={child.url} 
                            target={child.target}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
                          >
                            {child.title}
                          </a>
                        ) : (
                          <Link 
                            to={createUrl(child.url)}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                          >
                            {child.title}
                          </Link>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            } else {
              return item.url.startsWith('http') ? (
                <a key={item.id} href={item.url} className="hover:underline font-medium text-sm transition-colors" target={item.target}>
                  {item.title}
                </a>
              ) : (
                <Link key={item.id} to={createUrl(item.url)} className="hover:underline font-medium text-sm transition-colors">
                  {item.title}
                </Link>
              );
            }
          })}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Search Button */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 gap-1 transition-colors"
              >
                <Search size={16} />
                <span className="hidden xl:inline">{translate('header.search_site', 'Search site')}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {currentLanguage === 'en' ? 'Search Website' : 'Tìm kiếm Website'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={currentLanguage === 'en' ? 'Enter search keywords...' : 'Nhập từ khóa tìm kiếm...'}
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
                    <Search size={16} />
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 gap-2 h-10 px-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={18} />
            <span className="text-sm font-medium">Menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-primary z-50 lg:hidden animate-slide-in-right">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 gap-2 h-12 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} />
                <span className="text-sm font-medium">Close menu</span>
              </Button>
            </div>
            
            {/* Menu Content */}
            <div className="px-6 py-4 space-y-1">
              {parentMenuItems.map((item) => {
                const children = getChildItems(item.id);
                
                if (children.length > 0) {
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between py-3 border-b border-white/20">
                        <span className="font-medium text-lg text-white">{item.title}</span>
                        <ChevronDown size={16} className="text-white/70" />
                      </div>
                      <div className="grid grid-cols-1 gap-1 pl-2">
                        {children.map((child) => (
                          child.url.startsWith('http') ? (
                            <a 
                              key={child.id} 
                              href={child.url} 
                              className="block py-2 px-3 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors" 
                              target={child.target}
                            >
                              {child.title}
                            </a>
                          ) : (
                            <Link 
                              key={child.id} 
                              to={createUrl(child.url)} 
                              className="block py-2 px-3 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors" 
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  return item.url.startsWith('http') ? (
                    <a 
                      key={item.id} 
                      href={item.url} 
                      className="flex items-center justify-between py-3 border-b border-white/20 text-lg font-medium text-white hover:text-white/80 transition-colors" 
                      target={item.target}
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={16} className="text-white/70 rotate-[-90deg]" />
                    </a>
                  ) : (
                    <Link 
                      key={item.id} 
                      to={createUrl(item.url)} 
                      className="flex items-center justify-between py-3 border-b border-white/20 text-lg font-medium text-white hover:text-white/80 transition-colors" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={16} className="text-white/70 rotate-[-90deg]" />
                    </Link>
                  );
                }
              })}
              
              {/* Mobile Search */}
              <div className="pt-4 mt-4 border-t border-white/20">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white hover:bg-white/10 w-full justify-start gap-3 py-3 text-lg font-medium"
                >
                  <Search size={18} />
                  {translate('header.search_site', 'Search site')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;