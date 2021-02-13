-- Deploy portfolio:boardgame/update_function to pg



BEGIN;

CREATE  FUNCTION update_boardgame ( game json, bid int) RETURNS boardgame  AS $$

    UPDATE boardgame
        SET "name" = game->>'name', 
            min_age = (game->>'minAge')::posint,
            min_players = (game->>'minPlayers')::posint,
            max_players = (game->>'maxPlayers')::posint,
            "type" = game->>'type',
            note = (game->>'note')::posint,
            duration = (game->>'duration' || 'minutes'):: interval,                          
            creator = game ->>'creator'
        WHERE id = bid RETURNING *;

$$ LANGUAGE sql ;

COMMIT;


