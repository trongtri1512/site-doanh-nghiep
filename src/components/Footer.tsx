import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterSection {
  id: string;
  section_type: string;
  title: string;
  content: any;
  display_order: number;
  is_active: boolean;
}

interface FooterMenuItem {
  id: string;
  section_id: string;
  title: string;
  url: string;
  target: string;
  display_order: number;
  is_active: boolean;
}

const Footer = () => {
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [menuItems, setMenuItems] = useState<FooterMenuItem[]>([]);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    fetchFooterData();
  }, [currentLanguage]);

  const fetchFooterData = async () => {
    try {
      // Fetch footer sections
      const { data: sectionsData } = await supabase
        .from("footer_sections")
        .select("*")
        .eq("is_active", true)
        .eq("language_code", currentLanguage)
        .order("display_order", { ascending: true });

      // Fetch menu items
      const { data: menuData } = await supabase
        .from("footer_menu_items")
        .select("*")
        .eq("is_active", true)
        .eq("language_code", currentLanguage)
        .order("display_order", { ascending: true });

      setSections(sectionsData || []);
      setMenuItems(menuData || []);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  const getMenuItemsForSection = (sectionId: string) => {
    return menuItems.filter(item => item.section_id === sectionId);
  };

  const getSocialIcons = (socialLinks: any[]) => {
    const iconMap: any = {
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Youtube: Youtube,
    };

    return socialLinks?.map((link, index) => {
      const Icon = iconMap[link.icon];
      return Icon ? (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <Icon className="w-5 h-5" />
        </a>
      ) : null;
    });
  };

  const renderSection = (section: FooterSection) => {
    const sectionMenuItems = getMenuItemsForSection(section.id);

    switch (section.section_type) {
      case 'company_info':
        return (
          <div key={section.id}>
            <img 
              src={section.content?.logo_url || "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png"} 
              alt="IMV Logo" 
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm mb-4">
              {section.content?.description || "IMV Vietnam - Nâng tầm cuộc sống, vững vàng tương lai"}
            </p>
            <div className="flex space-x-4">
              {getSocialIcons(section.content?.social_links || [])}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div key={section.id}>
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <div className="text-sm text-gray-300 space-y-2">
              {section.content?.address && <p>Địa chỉ: {section.content.address}</p>}
              {section.content?.phone && <p>Điện thoại: {section.content.phone}</p>}
              {section.content?.email && <p>Email: {section.content.email}</p>}
            </div>
          </div>
        );

      default:
        return (
          <div key={section.id}>
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {sectionMenuItems.map((item) => (
                <li key={item.id}>
                  {item.url.startsWith('http') ? (
                    <a 
                      href={item.url} 
                      target={item.target}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="hover:text-white"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link to={item.url} className="hover:text-white">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map(renderSection)}
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