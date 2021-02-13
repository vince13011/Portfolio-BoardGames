-- Revert portfolio:boardgame/insert_Json from pg

BEGIN;

DROP FUNCTION new_boardgame(json);

COMMIT;
