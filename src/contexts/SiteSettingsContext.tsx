import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  site_title: string;
  site_description: string;
  site_keywords: string;
  site_logo: string;
  favicon: string;
  primary_color: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  maintenance_end_time: string;
  google_analytics_id: string;
  facebook_pixel_id: string;
}

interface SiteSettingsContextType {
  settings: Partial<SiteSettings>;
  loading: boolean;
  refetch: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value, setting_type, is_public")
        .eq("is_public", true);

      if (error) {
        console.error("Error fetching site settings:", error);
        return;
      }

      const settingsObject: any = {};
      data?.forEach((setting) => {
        let value = setting.setting_value;
        
        if (setting.setting_type === 'boolean') {
          value = setting.setting_value === true;
        } else if (typeof setting.setting_value === 'string') {
          value = setting.setting_value.replace(/^"|"$/g, '');
        }
        
        settingsObject[setting.setting_key] = value;
      });

      setSettings(settingsObject);
      
      // Update document title and meta tags if available
      if (settingsObject.site_title) {
        document.title = settingsObject.site_title;
      }
      
      if (settingsObject.site_description) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', settingsObject.site_description);
        }
      }
      
      if (settingsObject.favicon) {
        const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (faviconLink) {
          faviconLink.href = settingsObject.favicon;
        } else {
          const newFaviconLink = document.createElement('link');
          newFaviconLink.rel = 'icon';
          newFaviconLink.href = settingsObject.favicon;
          document.head.appendChild(newFaviconLink);
        }
      }
      
    } catch (error) {
      console.error("Error in fetchSiteSettings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refetch: fetchSiteSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};