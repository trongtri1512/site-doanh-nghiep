import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import IndexDynamic from "./pages/IndexDynamic";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Careers from "./pages/Careers";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pigeon from "./pages/brands/Pigeon";
import Verites from "./pages/brands/Verites";
import InstaxCamera from "./pages/brands/InstaxCamera";
import FujifilmImage from "./pages/brands/FujifilmImage";
import Etsuko from "./pages/brands/Etsuko";
import Astalift from "./pages/brands/Astalift";
import PigeonDynamic from "./pages/brands/PigeonDynamic";
import VeritesDynamic from "./pages/brands/VeritesDynamic";
import AstaliftDynamic from "./pages/brands/AstaliftDynamic";
import EtsukoDynamic from "./pages/brands/EtsukoDynamic";
import InstaxCameraDynamic from "./pages/brands/InstaxCameraDynamic";
import FujifilmImageDynamic from "./pages/brands/FujifilmImageDynamic";
import AdminAuth from "./pages/AdminAuth";
import AdminResetPassword from "./pages/AdminResetPassword";
import BannerManagement from "./pages/admin/BannerManagement";

// Admin imports
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import MenusManagement from "./pages/admin/MenusManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import LanguageManagement from "./pages/admin/LanguageManagement";
import HeaderManagement from "./pages/admin/HeaderManagement";

import HomepageBuilder from "./pages/admin/HomepageBuilder";
import BrandsManagement from "./pages/admin/BrandsManagement";
import BrandPageBuilder from "./pages/admin/BrandPageBuilder";
import NewsManagement from "./pages/admin/NewsManagement";
import NewsCreate from "./pages/admin/NewsCreate";
import NewsEdit from "./pages/admin/NewsEdit";
import ArticleCreate from "./pages/admin/ArticleCreate";
import ArticleEdit from "./pages/admin/ArticleEdit";
import CareersManagement from "./pages/admin/CareersManagement";
import AboutManagement from "./pages/admin/AboutManagement";
import FooterManagement from "./pages/admin/FooterManagement";
import FooterMenuManagement from "./pages/admin/FooterMenuManagement";
import Settings from "./pages/admin/Settings";

// Dynamic brand router
import BrandDynamicRouter from "./pages/brands/BrandDynamicRouter";
import NewsPageManagement from "./pages/admin/NewsPageManagement";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import BrandsShowcase from "./pages/BrandsShowcase";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteSettingsProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageProvider>
            <ScrollToTop />
        <Routes>
          {/* Vietnamese routes (default) */}
          <Route path="/" element={<IndexDynamic />} />
          <Route path="/search" element={<Search />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<BrandsShowcase />} />
          {/* Dynamic brand routes */}
          <Route path="/brands/:slug" element={<BrandDynamicRouter />} />
          
          {/* English routes with /en prefix */}
          <Route path="/en" element={<IndexDynamic />} />
          <Route path="/en/search" element={<Search />} />
          <Route path="/en/careers" element={<Careers />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/en/news" element={<News />} />
          <Route path="/en/news/:slug" element={<NewsDetail />} />
          <Route path="/en/about" element={<About />} />
          <Route path="/en/brands" element={<BrandsShowcase />} />
          {/* Dynamic brand routes for English */}
          <Route path="/en/brands/:slug" element={<BrandDynamicRouter />} />
          
          {/* Admin Auth Route */}
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="banner" element={<BannerManagement />} />
            <Route path="menus" element={<MenusManagement />} />
            <Route path="contact" element={<ContactManagement />} />
            <Route path="languages" element={<LanguageManagement />} />
            <Route path="header" element={<HeaderManagement />} />
            
            <Route path="homepage-builder" element={<HomepageBuilder />} />
            <Route path="brands" element={<BrandsManagement />} />
            <Route path="brands/:brandSlug/builder" element={<BrandPageBuilder />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="news/create" element={<NewsCreate />} />
            <Route path="news/edit/:id" element={<NewsEdit />} />
            <Route path="news-page" element={<NewsPageManagement />} />
            <Route path="articles" element={<ArticlesManagement />} />
            <Route path="articles/create" element={<ArticleCreate />} />
            <Route path="articles/edit/:id" element={<ArticleEdit />} />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="careers" element={<CareersManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="footer" element={<FooterManagement />} />
            <Route path="footer-menu" element={<FooterMenuManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </SiteSettingsProvider>
  </QueryClientProvider>
);

export default App;
