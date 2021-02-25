-- Revert portfolio:seeding from pg

BEGIN;

TRUNCATE TABLE boardgame;

COMMIT;
