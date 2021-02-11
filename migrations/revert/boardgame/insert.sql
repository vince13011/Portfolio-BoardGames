-- Revert portfolio:boardgame/insert from pg

BEGIN;

DROP FUNCTION new_boardgame(text, posint, posint, posint, text, posint, posint, text);

COMMIT;
