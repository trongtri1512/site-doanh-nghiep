-- Insert missing English content for homepage layouts
INSERT INTO public.homepage_layouts (section_type, title, content, language_code, is_active, display_order) VALUES
('stats', 'Statistics', '{
  "stats": [
    {
      "number": "29",
      "unit": "years",
      "description": "elevating life, securing the future"
    },
    {
      "number": "100%",
      "description": "renewable energy used",
      "note": "*Information based on IREC certificate issued by Swiss Carbon Asset Ltd for IMV Group confirming the use of renewable energy in Vietnam for the period from 1/1/2023 to 31/12/2023"
    },
    {
      "number": "7 million",
      "description": "products sold daily",
      "note": "*Information based on internal sales statistics"
    },
    {
      "number": "Top 1",
      "description": "best workplace in Vietnam",
      "note": "*Information based on 2024 ranking by Anphabe"
    }
  ]
}', 'en', true, 2),

('brands', 'Brands Section', '{
  "title": "Partner Brands",
  "subtitle": "IMV is proud to be the official distribution partner of many prestigious leading brands worldwide, bringing Vietnamese consumers high-quality products and dedicated services.",
  "cta_text": "Learn more about IMV",
  "cta_link": "/about"
}', 'en', true, 3),

('news', 'News Section', '{
  "title": "News & Events",
  "subtitle": "Stay updated with the latest news from IMV",
  "limit": 3
}', 'en', true, 4);