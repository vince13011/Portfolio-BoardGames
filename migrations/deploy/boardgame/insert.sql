-- Deploy portfolio:boardgame/insert to pg

BEGIN;

-- new_boardgame(text, posint, posint, posint, text, posint, posint, text)
CREATE FUNCTION new_boardgame(
	bname text, bmina posint,
	bminp posint, bmaxp posint,
	btype text, bnote posint,
	bdur posint, bcre text
) RETURNS boardgame AS $$
INSERT INTO boardgame(
	"name",
	min_age,
	min_players,
	max_players,
	"type",
	note,
	duration,
	creator
) VALUES
(bname, bmina, bminp, bmaxp, btype, bnote, (bdur || ' minutes')::interval, bcre)
RETURNING *;
$$ LANGUAGE sql;

COMMIT;
