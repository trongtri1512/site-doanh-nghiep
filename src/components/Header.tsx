import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSiteSettings();

  // Fetch menu items from database
  const { data: mainMenuItems = [] } = useQuery({
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

  // Fetch brand menu items from brands table
  const { data: brandMenuItems = [] } = useQuery({
    queryKey: ['brands-menu'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('name, slug')
        .eq('active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

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
        <div className="hidden lg:flex items-center gap-8">
          {mainMenuItems.map((item) => (
            <a key={item.id} href={item.url} className="hover:underline font-medium" target={item.target}>
              {item.title}
            </a>
          ))}
          {brandMenuItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:underline font-semibold">
                Các nhãn hàng
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {brandMenuItems.map((brand) => (
                  <DropdownMenuItem key={brand.slug} asChild>
                    <a href={`/brands/${brand.slug}`}>{brand.name}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-white hover:bg-white/20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/20">
          <div className="px-6 py-4 space-y-4">
            {mainMenuItems.map((item) => (
              <a key={item.id} href={item.url} className="block hover:underline" target={item.target}>
                {item.title}
              </a>
            ))}
            {brandMenuItems.length > 0 && (
              <div className="space-y-2">
                <div className="font-semibold">Các nhãn hàng</div>
                {brandMenuItems.map((brand) => (
                  <a key={brand.slug} href={`/brands/${brand.slug}`} className="block pl-4 text-sm hover:underline">
                    {brand.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;