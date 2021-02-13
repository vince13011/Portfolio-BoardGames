-- Revert portfolio:boardgame/update_function from pg

BEGIN;

DROP FUNCTION update_boardgame(json, int);

COMMIT;
