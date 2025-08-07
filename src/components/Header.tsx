import { ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  // Fetch all menu items from database
  const { data: allMenuItems = [] } = useQuery({
    queryKey: ['menu-items-main'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_type', 'main')
        .eq('is_active', true)
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
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img 
            src={settings.site_logo || "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png"} 
            alt={`${settings.site_title || "IMV"} Logo`} 
            className="h-12 w-auto brightness-0 invert"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
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
                        <a href={child.url} target={child.target}>{child.title}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            } else {
              return (
                <a key={item.id} href={item.url} className="hover:underline font-medium text-sm" target={item.target}>
                  {item.title}
                </a>
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
            <span className="hidden xl:inline">{t('header.search_site', 'Search site')}</span>
          </Button>
        </div>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/20">
          <div className="px-6 py-4 space-y-4">
            {parentMenuItems.map((item) => {
              const children = getChildItems(item.id);
              
              if (children.length > 0) {
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="font-semibold">{item.title}</div>
                    {children.map((child) => (
                      <a key={child.id} href={child.url} className="block pl-4 text-sm hover:underline" target={child.target}>
                        {child.title}
                      </a>
                    ))}
                  </div>
                );
              } else {
                return (
                  <a key={item.id} href={item.url} className="block hover:underline" target={item.target}>
                    {item.title}
                  </a>
                );
              }
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;