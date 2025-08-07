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
import BannerManagement from "./pages/admin/BannerManagement";

// Admin imports
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import MenusManagement from "./pages/admin/MenusManagementMultiLanguage";
import ContactManagement from "./pages/admin/ContactManagement";
import LanguageManagement from "./pages/admin/LanguageManagement";
import HeaderManagement from "./pages/admin/HeaderManagement";

import HomepageBuilder from "./pages/admin/HomepageBuilder";
import BrandsManagement from "./pages/admin/BrandsManagement";
import BrandPageBuilder from "./pages/admin/BrandPageBuilder";
import NewsManagement from "./pages/admin/NewsManagement";
import CareersManagement from "./pages/admin/CareersManagement";
import AboutManagement from "./pages/admin/AboutManagement";
import FooterManagement from "./pages/admin/FooterManagement";
import FooterMenuManagement from "./pages/admin/FooterMenuManagement";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteSettingsProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexDynamic />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/about" element={<About />} />
          <Route path="/brands/pigeon" element={<PigeonDynamic />} />
          <Route path="/brands/verites" element={<VeritesDynamic />} />
          <Route path="/brands/instax-camera" element={<InstaxCameraDynamic />} />
          <Route path="/brands/fujifilm-image" element={<FujifilmImageDynamic />} />
          <Route path="/brands/etsuko" element={<EtsukoDynamic />} />
          <Route path="/brands/astalift" element={<AstaliftDynamic />} />
          
          {/* Admin Auth Route */}
          <Route path="/admin/auth" element={<AdminAuth />} />
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
            <Route path="careers" element={<CareersManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="footer" element={<FooterManagement />} />
            <Route path="footer-menu" element={<FooterMenuManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
    </SiteSettingsProvider>
  </QueryClientProvider>
);

export default App;
