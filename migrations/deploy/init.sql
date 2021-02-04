-- Deploy portfolio:init to pg

BEGIN;

-- un domaine qui n'autorise que les valeurs positives
CREATE DOMAIN posint AS int CHECK (value > 0);

-- la table recensant ma collection de jeux de société
CREATE TABLE boardgame (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    min_age posint NOT NULL,
    min_players posint NOT NULL,
    max_players posint,
    "type" text NOT NULL, -- future table séparée + clé étrangère
    note posint NOT NULL,
    duration interval NOT NULL,
    creator text NOT NULL -- future table séparée + clé étrangère
);



COMMIT;
