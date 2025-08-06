-- Create table for careers page content
CREATE TABLE public.careers_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.careers_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage careers content" 
ON public.careers_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Careers content is viewable by everyone" 
ON public.careers_content 
FOR SELECT 
USING (is_active = true);

-- Create table for job postings
CREATE TABLE public.careers_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL,
  salary TEXT,
  experience TEXT,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.careers_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for job postings
CREATE POLICY "Admins can manage careers jobs" 
ON public.careers_jobs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Active careers jobs are viewable by everyone" 
ON public.careers_jobs 
FOR SELECT 
USING (status = 'active');

-- Create trigger for updating updated_at
CREATE TRIGGER update_careers_content_updated_at
BEFORE UPDATE ON public.careers_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_careers_jobs_updated_at
BEFORE UPDATE ON public.careers_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content sections
INSERT INTO public.careers_content (section_key, title, content, display_order) VALUES
('hero_title', 'Tuyển dụng', 'Gia nhập đội ngũ của chúng tôi', 1),
('hero_subtitle', 'Phụ đề Hero', 'Khám phá cơ hội nghề nghiệp tại công ty chúng tôi', 2),
('why_join_title', 'Tại sao nên làm việc với chúng tôi', 'Những lý do bạn nên chọn chúng tôi', 3),
('why_join_content', 'Nội dung Tại sao nên làm việc', 'Môi trường làm việc chuyên nghiệp, cơ hội phát triển nghề nghiệp, chế độ đãi ngộ hấp dẫn', 4),
('benefits_title', 'Quyền lợi nhân viên', 'Các quyền lợi dành cho nhân viên', 5),
('benefits_content', 'Nội dung Quyền lợi', 'Bảo hiểm đầy đủ, chế độ nghỉ phép, thưởng hiệu suất, đào tạo chuyên môn', 6);