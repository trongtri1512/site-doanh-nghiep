-- Update existing Astalift content and add missing sections
-- First, let's update the English content that already exists

UPDATE public.brand_page_content 
SET 
  title = 'Beauty is a Science',
  content = '{
    "headline": "Beauty is a Science",
    "subheadline": "ASTALIFT gives you confidence in your skin and brings joy to everyday life",
    "description": "Experience the revolutionary nanotechnology that penetrates deep into your skin cellular level. You can feel the difference from the very next day - firmer, more moisturized skin.",
    "cta_text": "Discover ASTALIFT",
    "cta_link": "#products",
    "background_video": "",
    "background_image": "https://astalift.com.sg/cdn/shop/files/ASTALIFT_visual_jelly_red_white_model_beside.pdf.jpg"
  }',
  styles = '{
    "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
    "textColor": "white",
    "padding": "120px 0",
    "minHeight": "100vh",
    "textAlign": "center"
  }'
WHERE brand_slug = 'astalift-en' AND language_code = 'en' AND section_key = 'hero_main';

-- Add additional English sections that don't exist yet
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, styles, display_order, is_active) VALUES
-- English About Section
('astalift-en', 'en', 'about', 'brand_story', 'The FUJIFILM Innovation Story', 
'{
  "title": "The FUJIFILM Innovation Story",
  "subtitle": "90+ Years of Cutting-Edge Technology",
  "content": "For more than 90 years, FUJIFILM has been developing unique proprietary technology in cutting-edge fields, starting with film and expanding into healthcare. Our expertise in nanotechnology, collagen research, antioxidant technology, and optical analysis creates the foundation for ASTALIFT''s revolutionary skincare solutions.",
  "highlights": [
    {
      "icon": "microscope",
      "title": "Nano Technology",
      "description": "Revolutionary nanotechnology from photographic film development enables deeper penetration of active ingredients"
    },
    {
      "icon": "dna",
      "title": "Collagen Expertise", 
      "description": "Deep understanding of collagen from film manufacturing translates to advanced skincare formulations"
    },
    {
      "icon": "shield",
      "title": "Antioxidant Protection",
      "description": "UV protection technology developed to prevent photo fading now protects your skin from aging"
    },
    {
      "icon": "eye",
      "title": "Optical Analysis",
      "description": "Light control technology from photography creates flawless skin appearance and luminosity"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0",
  "textAlign": "center"
}', 1, true),

-- English Ingredients Section
('astalift-en', 'en', 'features', 'key_ingredients', 'The Science Behind the Red', 
'{
  "title": "The Science Behind the Red",
  "subtitle": "Why ASTALIFT is Red - The Power of Nano-Astaxanthin",
  "description": "ASTALIFT contains a unique beauty ingredient called nano-astaxanthin that tones and moisturizes skin. Our red color comes from this powerful antioxidant that provides superior skin protection and rejuvenation.",
  "features": [
    {
      "title": "Nano-Astaxanthin",
      "description": "Powerful antioxidant that penetrates deep into skin cells for superior protection and repair",
      "icon": "atom",
      "benefit": "Anti-aging & Protection"
    },
    {
      "title": "Nano-Lycopene", 
      "description": "Advanced formulation that enhances skin elasticity and provides intense hydration",
      "icon": "droplet",
      "benefit": "Hydration & Elasticity"
    },
    {
      "title": "High-Performance Collagen",
      "description": "Developed through film R&D, provides structural support for firmer, younger-looking skin",
      "icon": "layers",
      "benefit": "Firmness & Structure"
    }
  ]
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 15%, 95%) 0%, hsl(0, 20%, 98%) 100%)",
  "padding": "80px 0"
}', 2, true),

-- English Products Section  
('astalift-en', 'en', 'products', 'product_showcase', 'ASTALIFT Product Lines', 
'{
  "title": "ASTALIFT Product Lines",
  "subtitle": "Comprehensive Skincare Solutions",
  "description": "Each product line is carefully formulated with our revolutionary nanotechnology to deliver visible results",
  "products": [
    {
      "name": "ASTALIFT IN-FOCUS",
      "category": "Anti-Aging Serum",
      "description": "Stem cell activating essence for radiant, elastic skin focusing on natural recovery and skin health",
      "keyBenefit": "Deep cellular regeneration",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/74aca39715da1e7ddf43bce1213bfa0d/thumb_astalift_07.jpg"
    },
    {
      "name": "ASTALIFT Skincare",
      "category": "Daily Care System", 
      "description": "Complete skincare system for elastic, moisturized skin with instant deep penetration power",
      "keyBenefit": "Enhanced elasticity & hydration",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2020-08/45aaece6dd87d4f8be68a051a70df248/thumb_astalift_01.jpg"
    },
    {
      "name": "ASTALIFT Brightening Care",
      "category": "Whitening System",
      "description": "Proprietary whitening method prevents dark spots and dullness for luminous, elastic skin",
      "keyBenefit": "Bright, transparent complexion",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/55503da0590c3014736d1287d9d9d9d9/thumb_astalift_02.jpg"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0"
}', 3, true),

-- English CTA Section
('astalift-en', 'en', 'cta', 'main_cta', 'Experience the ASTALIFT Difference', 
'{
  "title": "Experience the ASTALIFT Difference",
  "subtitle": "Transform Your Skin with Scientific Beauty",
  "description": "Join millions of women worldwide who trust ASTALIFT for visibly younger, more radiant skin. Feel the confidence that comes with healthy, beautiful skin.",
  "primaryCTA": {
    "text": "Shop ASTALIFT Now",
    "link": "/contact",
    "style": "primary"
  },
  "secondaryCTA": {
    "text": "Learn More",
    "link": "/about",
    "style": "outline"
  }
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
  "textColor": "white",
  "padding": "80px 0",
  "textAlign": "center"
}', 4, true)

-- Handle conflicts by using ON CONFLICT
ON CONFLICT (brand_slug, language_code, section_key) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  styles = EXCLUDED.styles,
  display_order = EXCLUDED.display_order;