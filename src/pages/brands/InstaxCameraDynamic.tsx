import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Camera, Film, Award, Users, Heart, Star, ExternalLink, Play, ChevronRight, Zap, Sun, Palette } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

// Import hero images
import instaxHeroBg from '@/assets/instax-hero-bg.jpg';
import instaxMoment1 from '@/assets/instax-moment-1.jpg';
import instaxMoment2 from '@/assets/instax-moment-2.png';
import instaxMoment3 from '@/assets/instax-moment-3.jpg';
import instaxCameras from '@/assets/instax-cameras.png';
import instaxFilms from '@/assets/instax-films.png';

interface BrandPageElement {
  id: string;
  section_type: string;
  title: string;
  content: any;
  styles?: any;
  display_order: number;
  is_active: boolean;
}

const InstaxCameraDynamic = () => {
  const [searchParams] = useSearchParams();
  const currentPath = window.location.pathname;
  
  // Determine language from URL path
  const lang = currentPath.includes('/en/') ? 'en' : 
               searchParams.get('lang') === 'en' ? 'en' : 'vi';
  
  const brandSlug = lang === 'en' ? 'instax-camera-en' : 'instax-camera';
  const [elements, setElements] = useState<BrandPageElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch brand info
  const { data: brand } = useQuery({
    queryKey: ["brand", brandSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", brandSlug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch brand page elements
  const { data: brandElements } = useQuery({
    queryKey: ["brand-pages", brand?.id],
    queryFn: async () => {
      if (!brand?.id) return [];
      
      const { data, error } = await supabase
        .from("brand_pages")
        .select("*")
        .eq("brand_id", brand.id)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!brand?.id,
  });

  useEffect(() => {
    if (brandElements) {
      setElements(brandElements);
    }
  }, [brandElements]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Content translations
  const content = {
    vi: {
      heroTitle: "Instax Camera",
      heroSubtitle: "Thương hiệu máy ảnh chụp lấy liền nổi tiếng thế giới",
      heroDescription: "Khám phá thế giới nhiếp ảnh tức thì với công nghệ tiên tiến từ Fujifilm. Tạo ra những khoảnh khắc đáng nhớ và chia sẻ niềm vui ngay lập tức.",
      exploreProducts: "Khám phá sản phẩm",
      backToHome: "Quay lại trang chủ",
      technologyTitle: "Công Nghệ Instax",
      technologySubtitle: "Bí mật đằng sau những bức ảnh tuyệt vời",
      technologyDescription: "Khám phá công nghệ độc đáo bên trong mỗi cuộn phim Instax. Từ việc chụp ảnh đến quá trình phát triển tự động, mọi thứ đều được thiết kế để tạo ra những khoảnh khắc hoàn hảo.",
      philosophyTitle: "Give Instax™",
      philosophySubtitle: "Triết lý thương hiệu",
      philosophyQuote: "\"Chúng ta không chỉ chụp ảnh, chúng ta tặng những khoảnh khắc\"",
      philosophyDescription: "Instax không chỉ là về việc chụp ảnh. Đó là về việc tạo ra những khoảnh khắc hào phóng, kết nối mọi người lại với nhau thông qua niềm vui chia sẻ.",
      featuredProducts: "Sản Phẩm Nổi Bật",
      cameras: "Máy Ảnh",
      films: "Phim Chụp",
      statsPhotos: "Ảnh được in",
      statsCountries: "Quốc gia",
      statsUsers: "Người dùng",
      statsYears: "Năm kinh nghiệm",
      instaxMini: "Instax Mini",
      instaxSquare: "Instax Square", 
      instaxWide: "Instax Wide",
      miniDescription: "Kích thước như thẻ tín dụng, hoàn hảo cho mọi ngày",
      squareDescription: "Định dạng vuông gọn gàng, lựa chọn của các nhà sáng tạo",
      wideDescription: "Rộng gấp đôi phim mini, chỗ cho mọi người"
    },
    en: {
      heroTitle: "Instax Camera",
      heroSubtitle: "World's Leading Instant Camera Brand",
      heroDescription: "Discover the world of instant photography with advanced technology from Fujifilm. Create memorable moments and share joy instantly.",
      exploreProducts: "Explore Products",
      backToHome: "Back to home",
      technologyTitle: "Instax Technology",
      technologySubtitle: "The secret behind amazing photos",
      technologyDescription: "Discover the unique technology inside every Instax film. From capturing to automatic development, everything is designed to create perfect moments.",
      philosophyTitle: "Give Instax™",
      philosophySubtitle: "Brand Philosophy",
      philosophyQuote: "\"We don't just take photos, we give moments\"",
      philosophyDescription: "Instax isn't just about taking photos. It's about creating generous moments, bringing people together through the joy of sharing.",
      featuredProducts: "Featured Products",
      cameras: "Cameras",
      films: "Films",
      statsPhotos: "Photos printed",
      statsCountries: "Countries",
      statsUsers: "Users worldwide",
      statsYears: "Years of experience",
      instaxMini: "Instax Mini",
      instaxSquare: "Instax Square",
      instaxWide: "Instax Wide",
      miniDescription: "Credit card-sized joy, perfect for everyday",
      squareDescription: "Neatly-framed square film, the go-to for creators",
      wideDescription: "Twice as wide as mini film, room for everyone"
    }
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-pink-300/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>
      
      <main>
        <div className="container mx-auto px-4 py-4">
          <Link 
            to={lang === 'en' ? "/en" : "/"} 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            {t.backToHome}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Main Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${instaxHeroBg})`,
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-pink-900/60" />
          </div>

          {/* Floating Images */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top Left - Floating Camera */}
            <div className="absolute top-20 left-10 opacity-80 animate-pulse">
              <img 
                src={instaxCameras} 
                alt="Instax Cameras" 
                className="w-32 h-32 object-contain drop-shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-700"
              />
            </div>
            
            {/* Top Right - Moment 1 */}
            <div className="absolute top-32 right-16 opacity-70 animate-bounce">
              <div className="relative">
                <img 
                  src={instaxMoment1} 
                  alt="Instax Moment" 
                  className="w-40 h-28 object-cover rounded-xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-ping" />
              </div>
            </div>

            {/* Center Left - Moment 2 */}
            <div className="absolute top-1/2 left-20 transform -translate-y-1/2 opacity-60">
              <img 
                src={instaxMoment2} 
                alt="Instax Community" 
                className="w-36 h-24 object-cover rounded-lg shadow-xl transform rotate-3 hover:-rotate-3 transition-transform duration-600"
              />
            </div>

            {/* Bottom Right - Films */}
            <div className="absolute bottom-32 right-20 opacity-75">
              <div className="relative">
                <img 
                  src={instaxFilms} 
                  alt="Instax Films" 
                  className="w-28 h-28 object-contain drop-shadow-xl transform rotate-12 hover:scale-110 transition-all duration-500"
                />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Bottom Left - Moment 3 */}
            <div className="absolute bottom-40 left-32 opacity-65">
              <img 
                src={instaxMoment3} 
                alt="Instax Sharing" 
                className="w-32 h-20 object-cover rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-700"
              />
            </div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-1000" />
            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-2000" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-3000" />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full mb-8 shadow-xl">
                  <Camera className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Fujifilm Technology</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent mb-8 drop-shadow-2xl">
                  {t.heroTitle}
                </h1>
                
                <div className="relative inline-block mb-8">
                  <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
                    {t.heroSubtitle}
                  </p>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full" />
                </div>
                
                <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-md">
                  {t.heroDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a 
                    href="https://instaxcamera.com.vn/cameras"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 font-bold text-lg"
                  >
                    {t.exploreProducts}
                    <ExternalLink size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                  
                  <button className="group inline-flex items-center gap-3 px-10 py-5 border-3 border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 font-bold text-lg backdrop-blur-sm">
                    <Play size={24} className="group-hover:scale-125 transition-transform duration-300" />
                    {lang === 'en' ? 'Watch Brand Story' : 'Xem Câu Chuyện'}
                  </button>
                </div>

                {/* Philosophy tagline */}
                <div className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg rounded-full border border-white/30">
                  <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
                  <span className="text-white font-bold text-lg tracking-wide">
                    {lang === 'en' ? "don't just take, give.™" : "đừng chỉ chụp, hãy tặng.™"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium opacity-75">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "1B+", label: t.statsPhotos, icon: Camera },
                { number: "100+", label: t.statsCountries, icon: Users },
                { number: "50M+", label: t.statsUsers, icon: Heart },
                { number: "25+", label: t.statsYears, icon: Award }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={28} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                  {t.technologyTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  {t.technologySubtitle}
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                  {t.technologyDescription}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: lang === 'en' ? 'Instant Development' : 'Phát Triển Tức Thì',
                    description: lang === 'en' ? 'Advanced chemistry enables photos to develop in 90 seconds' : 'Hóa học tiên tiến cho phép ảnh phát triển trong 90 giây'
                  },
                  {
                    icon: Sun,
                    title: lang === 'en' ? 'Perfect Exposure' : 'Phơi Sáng Hoàn Hảo',
                    description: lang === 'en' ? 'Automatic exposure adjustment for optimal photo quality' : 'Điều chỉnh phơi sáng tự động cho chất lượng ảnh tối ưu'
                  },
                  {
                    icon: Palette,
                    title: lang === 'en' ? 'Vibrant Colors' : 'Màu Sắc Rực Rỡ',
                    description: lang === 'en' ? 'Specialized film layers ensure rich, true-to-life colors' : 'Các lớp phim chuyên biệt đảm bảo màu sắc phong phú, chân thực'
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">
                {t.philosophyTitle}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.philosophySubtitle}
              </p>
              <blockquote className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-8 italic">
                {t.philosophyQuote}
              </blockquote>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
                {t.philosophyDescription}
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {lang === 'en' ? "don't just take, give.™" : "đừng chỉ chụp, hãy tặng.™"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {t.featuredProducts}
              </h2>
            </div>
            
            {/* Cameras */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
                <Camera className="w-8 h-8 text-blue-600" />
                {t.cameras}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Instax Mini 12',
                    image: '/lovable-uploads/instax-mini12.jpg',
                    colors: ['Lilac Purple', 'Blossom Pink', 'Clay White', 'Mint Green', 'Pastel Blue'],
                    price: 'From $79.99'
                  },
                  {
                    name: 'Instax Square SQ1',
                    image: '/lovable-uploads/instax-sq1.jpg',
                    colors: ['Terracotta Orange', 'Glacier Blue', 'Chalk White'],
                    price: 'From $119.99'
                  },
                  {
                    name: 'Instax Wide 300',
                    image: '/lovable-uploads/instax-wide300.jpg',
                    colors: ['Black'],
                    price: 'From $139.99'
                  }
                ].map((camera, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                        <Camera size={64} className="text-gray-400" />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {camera.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {camera.colors.slice(0, 3).map((color, colorIndex) => (
                          <span key={colorIndex} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                            {color}
                          </span>
                        ))}
                        {camera.colors.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                            +{camera.colors.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          {camera.price}
                        </span>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                          {lang === 'en' ? 'Learn more' : 'Tìm hiểu thêm'}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Films */}
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
                <Film className="w-8 h-8 text-purple-600" />
                {t.films}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: t.instaxMini,
                    description: t.miniDescription,
                    size: '62×46mm',
                    icon: '📷'
                  },
                  {
                    name: t.instaxSquare,
                    description: t.squareDescription,
                    size: '62×62mm',
                    icon: '⬜'
                  },
                  {
                    name: t.instaxWide,
                    description: t.wideDescription,
                    size: '99×62mm',
                    icon: '📐'
                  }
                ].map((film, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group">
                    <div className="text-4xl mb-4">
                      {film.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {film.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {film.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span>{film.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {lang === 'en' ? 'Start Your Instax Journey' : 'Bắt Đầu Hành Trình Instax'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {lang === 'en' 
                  ? 'Discover the joy of instant photography and create memories that last forever.'
                  : 'Khám phá niềm vui của nhiếp ảnh tức thì và tạo ra những kỷ niệm bất tử.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://instaxcamera.com.vn/cameras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold"
                >
                  {t.exploreProducts}
                  <ExternalLink size={20} />
                </a>
                <a 
                  href="https://www.tiktok.com/@instax_vietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold"
                >
                  {lang === 'en' ? 'Follow on TikTok' : 'Theo dõi TikTok'}
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic content from database */}
        {elements.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {elements.map((element) => {
                  switch (element.section_type) {
                    case "hero":
                      return (
                        <div key={element.id} className="text-center mb-12">
                          <h1 className="text-4xl font-bold text-primary mb-4">
                            {element.content?.title || brand?.name}
                          </h1>
                          <p className="text-xl text-muted-foreground mb-8">
                            {element.content?.subtitle || brand?.description}
                          </p>
                          {element.content?.background_image && !element.content.background_image.includes('/src/assets/') && (
                            <img 
                              src={element.content.background_image} 
                              alt={element.content?.title || brand?.name} 
                              className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                          )}
                          {element.content?.background_image?.includes('/src/assets/') && (
                            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center rounded-lg shadow-lg">
                              <div className="text-center">
                                <Camera size={48} className="text-blue-500 mx-auto mb-2" />
                                <p className="text-gray-600 dark:text-gray-300">{element.content?.title || brand?.name}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InstaxCameraDynamic;