-- Deploy portfolio:seeding to pg
BEGIN;

INSERT INTO boardgame
("name", min_age, min_players, max_players, "type", note, duration, creator) 
VALUES
('Cluedo', 7,3,4,'Familial',6,'40 minutes','Le colonnel Moutarde'),
('Uno',5,2,6,'Familial',7,'30 minutes','Jean Bon'),
('Cortex',10,3,7,'Educatif',8,'35 minutes','John Doe'),
('Trivial Pursuit',8, 3, 8,'Educatif',4,'25 minutes','Chris Haney'),
('Jungle Speed', 7, 3, 6,'Reflexe',7,'30 minutes','Michel Dupont');

COMMIT;