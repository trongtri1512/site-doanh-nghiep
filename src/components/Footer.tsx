import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png" 
              alt="IMV Logo" 
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm mb-4">
              IMV Vietnam - Nâng tầm cuộc sống, vững vàng tương lai
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-white">Các nhãn hàng</a></li>
              <li><a href="#" className="hover:text-white">Tin tức</a></li>
              <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h3 className="font-semibold mb-4">Phát triển bền vững</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Cam kết bền vững</a></li>
              <li><a href="#" className="hover:text-white">Báo cáo bền vững</a></li>
              <li><a href="#" className="hover:text-white">Môi trường</a></li>
              <li><a href="#" className="hover:text-white">Cộng đồng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>Điện thoại: (028) 1234 5678</p>
              <p>Email: info@imv.com.vn</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 IMV Vietnam. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Chính sách bảo mật</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;