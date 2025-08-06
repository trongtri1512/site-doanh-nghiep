import { Search, Globe, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSiteSettings();

  return (
    <header className="w-full bg-primary text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden md:flex justify-end items-center px-6 py-2 text-sm border-b border-white/20">
        <div className="flex items-center gap-6">
          <button className="hover:underline">Chủ đề</button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:underline">
              <Globe size={16} />
              {settings.site_title || "IMV Vietnam"}
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{settings.site_title || "IMV Vietnam"}</DropdownMenuItem>
              <DropdownMenuItem>IMV Global</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="hover:underline">Thay đổi địa điểm</button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Search size={16} />
            Tìm kiếm trang
          </Button>
        </div>
      </div>

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
          <a href="/" className="hover:underline font-medium">Trang chủ</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:underline font-semibold">
              Các nhãn hàng
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a href="/brands/pigeon">Pigeon</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/brands/verites">Verites</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/brands/instax-camera">Instax Camera</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/brands/fujifilm-image">Fujifilm Image</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/brands/etsuko">Etsuko</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/brands/astalift">Astalift</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="/news" className="hover:underline">Tin tức</a>
          <a href="/careers" className="hover:underline">Cơ hội nghề nghiệp</a>
          <a href="/about" className="hover:underline">Về chúng tôi</a>
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
            <a href="/" className="block hover:underline">Trang chủ</a>
            <div className="space-y-2">
              <div className="font-semibold">Các nhãn hàng</div>
              <a href="/brands/pigeon" className="block pl-4 text-sm hover:underline">Pigeon</a>
              <a href="/brands/verites" className="block pl-4 text-sm hover:underline">Verites</a>
              <a href="/brands/instax-camera" className="block pl-4 text-sm hover:underline">Instax Camera</a>
              <a href="/brands/fujifilm-image" className="block pl-4 text-sm hover:underline">Fujifilm Image</a>
              <a href="/brands/etsuko" className="block pl-4 text-sm hover:underline">Etsuko</a>
              <a href="/brands/astalift" className="block pl-4 text-sm hover:underline">Astalift</a>
            </div>
            <a href="/news" className="block hover:underline">Tin tức</a>
            <a href="/careers" className="block hover:underline">Cơ hội nghề nghiệp</a>
            <a href="/about" className="block hover:underline">Về chúng tôi</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;