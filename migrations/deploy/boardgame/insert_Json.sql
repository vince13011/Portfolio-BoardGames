-- Deploy portfolio:boardgame/insert-json to pg

BEGIN;

-- une version monoparam qui bénéficie de la souplesse du connecteur pg
-- l'objet passé en param côté JS est transformé en sa représentation JSON côté SQL
CREATE FUNCTION new_boardgame(game json) RETURNS boardgame AS $$
INSERT INTO boardgame(
	"name", min_age,
	min_players, max_players,
	"type", note,
	duration, creator
) VALUES
(
    -- on parcourt donc le JSON pour récupérer une à une les propriétés qui nous intéressent
    -- l'opérateur ->> retourne toujours du texte, à nous de le caster en autre chose si nécessaire
	game->>'name', (game->>'minAge')::int,
	(game->>'minPlayers')::int, (game->>'maxPlayers')::int,
	game->>'type', (game->>'note')::int, 
	(game->>'duration' || ' minutes')::interval, game->>'creator'
)
RETURNING *;
$$ LANGUAGE sql;

COMMIT;