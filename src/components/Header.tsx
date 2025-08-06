import { Search, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="w-full bg-primary text-white">
      {/* Top bar */}
      <div className="flex justify-end items-center px-6 py-2 text-sm border-b border-white/20">
        <div className="flex items-center gap-4">
          <span>Chủ đề</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <Globe size={16} />
              Unilever Vietnam
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Unilever Vietnam</DropdownMenuItem>
              <DropdownMenuItem>Unilever Global</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span>Thay đổi địa điểm</span>
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
            src="/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="hover:underline">Tổng quan</a>
          <a href="#" className="hover:underline font-semibold">Các nhãn hàng</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:underline">
              Phát triển bền vững
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Cam kết bền vững</DropdownMenuItem>
              <DropdownMenuItem>Báo cáo bền vững</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#" className="hover:underline">Tin tức</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:underline">
              Cơ hội nghề nghiệp
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Việc làm</DropdownMenuItem>
              <DropdownMenuItem>Thực tập</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;