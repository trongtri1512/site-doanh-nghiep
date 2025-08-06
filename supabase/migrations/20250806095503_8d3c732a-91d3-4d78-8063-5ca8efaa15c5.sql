-- Create storage bucket for brand images
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-images', 'brand-images', true);

-- Create policies for brand images
CREATE POLICY "Brand images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'brand-images');

CREATE POLICY "Admins can upload brand images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'brand-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update brand images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'brand-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete brand images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'brand-images' AND has_role(auth.uid(), 'admin'::app_role));