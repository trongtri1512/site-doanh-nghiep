-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule auto-publish function to run every 5 minutes
SELECT cron.schedule(
  'auto-publish-scheduled-news',
  '*/5 * * * *', -- every 5 minutes
  $$
  SELECT public.auto_publish_scheduled_news();
  $$
);