-- Migration: Add ON DELETE CASCADE to webpage_tags.webpages_id foreign key
-- Date: 2026-02-12
-- Purpose: Allow webpages rows to be deleted without foreign key errors
--          when they have associated webpage_tags rows

-- Drop the existing foreign key constraint
ALTER TABLE public.webpage_tags
    DROP CONSTRAINT IF EXISTS webpage_tags_webpages_id_fk;

-- Recreate with ON DELETE CASCADE
ALTER TABLE public.webpage_tags
    ADD CONSTRAINT webpage_tags_webpages_id_fk
    FOREIGN KEY (webpages_id) REFERENCES public.webpages(id)
    ON DELETE CASCADE;
