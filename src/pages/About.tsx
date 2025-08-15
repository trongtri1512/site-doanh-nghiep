import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Target, Eye, Globe, TrendingUp, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import imvBuilding from "@/assets/imv-building.png";
import ourBusiness from "@/assets/our-business.png";

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: <Globe className="text-primary" size={32} />,
      title: t('about.achievement_years_title'),
      subtitle: t('about.achievement_years_subtitle')
    },
    {
      icon: <Users className="text-primary" size={32} />,
      title: t('about.achievement_employees_title'),
      subtitle: t('about.achievement_employees_subtitle')
    },
    {
      icon: <Building className="text-primary" size={32} />,
      title: t('about.achievement_brands_title'),
      subtitle: t('about.achievement_brands_subtitle')
    },
    {
      icon: <TrendingUp className="text-primary" size={32} />,
      title: t('about.achievement_customers_title'),
      subtitle: t('about.achievement_customers_subtitle')
    }
  ];

  const brands = [
    {
      category: t('about.business_healthcare_category'),
      description: t('about.business_healthcare_description'),
      items: ["FUJIFILM Instax", "FUJIFILM Photo Imaging", "FUJIFILM Printing Solutions"]
    },
    {
      category: t('about.business_baby_category'), 
      description: t('about.business_baby_description'),
      items: ["Pigeon", "Etsuko"]
    },
    {
      category: t('about.business_lifestyle_category'),
      description: t('about.business_lifestyle_description'),
      items: ["ASTALIFT", "Verites"]
    }
  ];

  const partnerships = [
    {
      name: t('about.partnership_fujifilm_name'),
      description: t('about.partnership_fujifilm_description'),
      since: "2008"
    },
    {
      name: t('about.partnership_pigeon_name'),
      description: t('about.partnership_pigeon_description'),
      since: "2012"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          {t('about.breadcrumb_home')}
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">{t('about.page_title')}</h1>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('about.hero_title')}
                </h2>
                <p className="text-lg text-primary font-semibold mb-4">
                  {t('about.hero_subtitle')}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('about.mission_text')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.vision_text')}
                </p>
              </div>
              <div>
                <img 
                  src={imvBuilding} 
                  alt="IMV Building" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{item.title}</div>
                  <div className="text-muted-foreground text-sm">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={32} />
                <h2 className="text-2xl font-bold text-foreground">{t('about.mission_title')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.mission_text')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary" size={32} />
                <h2 className="text-2xl font-bold text-foreground">{t('about.vision_title')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision_text')}
              </p>
            </div>
          </div>

          {/* Our Business */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              {t('about.business_title')}
            </h2>
            <div className="text-center mb-8">
              <img 
                src={ourBusiness} 
                alt="Our Business Overview" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {brands.map((brand, index) => (
                <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{brand.category}</h3>
                  <p className="text-muted-foreground mb-4">{brand.description}</p>
                  <div className="space-y-2">
                    {brand.items.map((item, itemIndex) => (
                      <span 
                        key={itemIndex}
                        className="inline-block mr-2 mb-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Partnerships */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t('about.partnerships_title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {partnerships.map((partner, index) => (
                <div key={index} className="text-center bg-muted/30 rounded-lg p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                      {t('about.partnership_since')} {partner.since}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{partner.name}</h3>
                  <p className="text-muted-foreground text-sm">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t('about.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('about.cta_text')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                {t('about.cta_contact_button')}
              </button>
              <Link to="/careers" className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
                {t('about.cta_careers_button')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;