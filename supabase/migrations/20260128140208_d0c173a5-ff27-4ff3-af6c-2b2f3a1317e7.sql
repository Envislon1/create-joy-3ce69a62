-- Create trigger to update payment totals when a vote is inserted
CREATE TRIGGER on_vote_insert_update_payment_totals
AFTER INSERT ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_payment_totals();

-- Create trigger to update contestant votes when a vote is inserted
CREATE TRIGGER on_vote_insert_update_contestant_votes
AFTER INSERT ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_contestant_votes();