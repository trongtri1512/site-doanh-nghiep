import { ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSiteSettings();
  const { t: translate, currentLanguage } = useLanguage();
  
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

  // Organize menu items into parent-child structure
  const parentMenuItems = allMenuItems.filter(item => !item.parent_id);
  const childMenuItems = allMenuItems.filter(item => item.parent_id);
  
  const getChildItems = (parentId: string) => {
    return childMenuItems.filter(child => child.parent_id === parentId);
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
            
            if (children.length > 0) {
              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger className="flex items-center gap-1 hover:underline font-medium text-sm">
                    {item.title}
                    <ChevronDown size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {children.map((child) => (
                      <DropdownMenuItem key={child.id} asChild>
                        {child.url.startsWith('http') ? (
                          <a href={child.url} target={child.target}>{child.title}</a>
                        ) : (
                          <Link to={createUrl(child.url)}>{child.title}</Link>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            } else {
              return item.url.startsWith('http') ? (
                <a key={item.id} href={item.url} className="hover:underline font-medium text-sm" target={item.target}>
                  {item.title}
                </a>
              ) : (
                <Link key={item.id} to={createUrl(item.url)} className="hover:underline font-medium text-sm">
                  {item.title}
                </Link>
              );
            }
          })}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Search Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 gap-1"
          >
            <Search size={16} />
            <span className="hidden xl:inline">{translate('header.search_site', 'Search site')}</span>
          </Button>
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
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-center justify-between py-3 border-b border-white/20">
                        <span className="font-medium text-lg text-white">{item.title}</span>
                        <ChevronDown size={16} className="text-white/70" />
                      </div>
                      {children.map((child) => (
                        child.url.startsWith('http') ? (
                          <a 
                            key={child.id} 
                            href={child.url} 
                            className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors" 
                            target={child.target}
                          >
                            {child.title}
                          </a>
                        ) : (
                          <Link 
                            key={child.id} 
                            to={createUrl(child.url)} 
                            className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors" 
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        )
                      ))}
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