# Portfolio jeux de société
Ici j'ai créé une API REST qui sert à gérer son stock de jeu de société en base de données.  
Ce petit projet a pour but de montrer une partie de mes compétences en javaScript côté Back end ainsi que la diversité des outils que je peux utiliser

## Stack

- Node 10+
  - Express
- PostgreSQL 11+
- Redis (cache)
- Sqitch (migration)
- Joi (validator)

## Pour utiliser l'API
 -Clonner le projet  
 -installer sur sa machine Node.js, PostgreSQL, redis et sqitch.  
 https://nodejs.org/fr/download/  
 https://www.postgresql.org/download/  
 https://redis.io/download  
 https://sqitch.org/download/      
 -créer un fichier .env en se basant sur le fichier .env.example  
 -créer une base de donnée PostgreSQL boardgame
   
 ### Ensuite lancer les commandes suivantes dans sa CLI:  
 -npm i  
 -sqitch deploy db:pg:boardgame  
 -node index.js
 
 Vous pouvez maintenant utiliser l'API.  
 Si vous possedez l'extension Rest client de VSC  vous pouvez également utiliser le fichier API.HTTP pour faire vos tests  
 Merci d'avoir consulté ce projet et n'hésitez pas à m'envoyer vos critiques et conseils afin que je puisse améliorer mes compétences
 
