-- Revert portfolio:init from pg

BEGIN;

DROP TABLE boardgame;

DROP DOMAIN posint;

COMMIT;
