-- Create storage bucket for CVs if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create policies for CV uploads if not exists  
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can upload CVs'
  ) THEN
    CREATE POLICY "Anyone can upload CVs" 
    ON storage.objects 
    FOR INSERT 
    WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = 'cv');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Admins can view all CVs'
  ) THEN
    CREATE POLICY "Admins can view all CVs" 
    ON storage.objects 
    FOR SELECT 
    USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));
  END IF;
END $$;