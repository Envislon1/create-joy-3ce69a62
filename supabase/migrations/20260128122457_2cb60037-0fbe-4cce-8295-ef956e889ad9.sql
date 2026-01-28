-- Manually apply the vote boost for Sike Adelowo who was missed
-- The original highest votes before boosts was 12, so with +300 bonus = 312 votes
UPDATE public.contestants 
SET votes = 312 
WHERE id = 'f30797d8-8dd0-4163-8b2e-e82eb4de96b2';