-- Revert portfolio:check_players from pg

BEGIN;

ALTER TABLE boardgame
DROP CONSTRAINT players_order;

COMMIT;
