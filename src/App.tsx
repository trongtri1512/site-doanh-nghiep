import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pigeon from "./pages/brands/Pigeon";
import Verites from "./pages/brands/Verites";
import InstaxCamera from "./pages/brands/InstaxCamera";
import Etsuko from "./pages/brands/Etsuko";
import Astalift from "./pages/brands/Astalift";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brands/pigeon" element={<Pigeon />} />
          <Route path="/brands/verites" element={<Verites />} />
          <Route path="/brands/instax-camera" element={<InstaxCamera />} />
          <Route path="/brands/etsuko" element={<Etsuko />} />
          <Route path="/brands/astalift" element={<Astalift />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
