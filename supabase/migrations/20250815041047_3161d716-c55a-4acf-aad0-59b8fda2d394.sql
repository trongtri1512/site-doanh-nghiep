-- Add explicit SELECT policy for job_applications to restrict access to admins only
CREATE POLICY "Only admins can view job applications" 
ON public.job_applications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));