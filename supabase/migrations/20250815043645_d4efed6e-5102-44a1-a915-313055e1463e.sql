-- Add English brand for Pigeon
INSERT INTO brands (name, slug, description, category, language_code, featured, active, image_url) 
VALUES (
  'Pigeon',
  'pigeon-en',
  'For over 6 decades, PIGEON has dedicated research capabilities towards the sucking behavior of babies. Having established a solid foundation of research, PIGEON is recommended today by most top medical and academic professionals.',
  'Baby Care',
  'en',
  true,
  true,
  'https://pigeon-cambodia.com/wp-content/uploads/2023/06/Yuichi-Nakata.webp'
) ON CONFLICT (slug, language_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  featured = EXCLUDED.featured,
  active = EXCLUDED.active,
  image_url = EXCLUDED.image_url;

-- Get the brand ID for the pigeon-en brand
DO $$
DECLARE
    brand_uuid UUID;
BEGIN
    SELECT id INTO brand_uuid FROM brands WHERE slug = 'pigeon-en' AND language_code = 'en';
    
    -- Delete existing brand pages for this brand
    DELETE FROM brand_pages WHERE brand_id = brand_uuid;
    
    -- Insert hero section
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'hero',
        'Pigeon: Trusted by Mothers Worldwide',
        jsonb_build_object(
            'title', 'Pigeon: Trusted by Mothers Worldwide',
            'subtitle', 'For over 6 decades, PIGEON has dedicated research capabilities towards the sucking behavior of babies',
            'background_image', 'https://pigeon-cambodia.com/wp-content/uploads/2023/07/Our-History-Map.webp'
        ),
        1,
        true
    );
    
    -- Insert founder story section
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'about',
        'Our Founder''s Vision',
        jsonb_build_object(
            'description', '"I want to produce an artificial nipple which is very similar to mothers'' nipple" – Yuichi Nakata, founder of Pigeon. With no available research data and know how, Mr. Nakata found his own unique methods to study the sucking mechanism of babies.',
            'image', 'https://pigeon-cambodia.com/wp-content/uploads/2023/06/Yuichi-Nakata.webp'
        ),
        2,
        true
    );
    
    -- Insert timeline section with key milestones
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'features',
        'Our Journey Through the Decades',
        jsonb_build_object(
            'features', jsonb_build_array(
                jsonb_build_object(
                    'title', '1957: Foundation',
                    'description', 'Pigeon Honyuki Honpo Corporation established in Chigasaki City, Kanagawa Prefecture by founder Yuichi Nakata'
                ),
                jsonb_build_object(
                    'title', '1978: Global Expansion',
                    'description', 'Pigeon Singapore Pte. Ltd. established in Singapore, marking our first international expansion'
                ),
                jsonb_build_object(
                    'title', '1991: Research Excellence',
                    'description', 'Joso Research Center (now Central Research Center) established in Ibaraki Prefecture for advanced baby research'
                ),
                jsonb_build_object(
                    'title', '1995-1997: Stock Exchange',
                    'description', 'Listed on the Second Section (1995) and then First Section (1997) of the Tokyo Stock Exchange'
                ),
                jsonb_build_object(
                    'title', '2006: Manufacturing in China',
                    'description', 'Pigeon Manufacturing (Shanghai) Co., Ltd. established, expanding our global manufacturing capabilities'
                ),
                jsonb_build_object(
                    'title', 'Today: 40+ Countries',
                    'description', 'Spreading our wings to over 40 countries, PIGEON is the top player in international markets'
                )
            )
        ),
        3,
        true
    );
    
    -- Insert global presence section
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'about',
        'Global Presence',
        jsonb_build_object(
            'description', 'With headquarters in Japan, PIGEON has subsidiaries in Singapore, Malaysia, India, Thailand, Korea, China, and USA. Singapore serves as the regional headquarters for ASEAN countries. We are a one-stop shop for mothers and mother-to-be.',
            'image', 'https://pigeon-cambodia.com/wp-content/uploads/2023/07/Our-History-Map.webp'
        ),
        4,
        true
    );
    
    -- Insert research achievements section
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'about',
        'Research Excellence',
        jsonb_build_object(
            'description', 'Mr. Nakata''s research data has contributed to the development of artificial teats. What Yuichi Nakata discovered was the unique movements of babies'' tongues when they sucked milk - scientifically named "Peristaltic Movements" - which formed the basis of all bottles and nipples made in the PIGEON research center.',
            'image', 'https://pigeon-cambodia.com/wp-content/uploads/2023/06/Our-History-Image-2.webp'
        ),
        5,
        true
    );
    
    -- Insert call to action
    INSERT INTO brand_pages (brand_id, section_type, title, content, display_order, is_active) VALUES (
        brand_uuid,
        'cta',
        'Discover Our Products',
        jsonb_build_object(
            'description', 'Experience the quality, comfort, convenience and affordability that has made PIGEON the market leader for over 6 decades.',
            'button_text', 'Learn More',
            'button_link', '/en/contact'
        ),
        6,
        true
    );
END $$;