const db = require('../database');

//ici on défénit notre classe
class Boardgame {
 
    /*
    ici on déclare les champs de notre classe 
    il est donc plus facile de comprendre la classe dans son ensemble
    */

    id;
    name;
    minAge;
    minPlayers;
    maxPlayers;
    type;
    note;
    duration;
    creator;

    /*
    setters (accesseurs)

    appeler :
    this.min_players = 4
    déclenchera :
    this.min_players(4)
    ce qui aura pour effet :
    this.minPlayers = 4
    */
    set min_players(val) {
        this.minPlayers = val;
    }

    set max_players(val) {
        this.maxPlayers = val;
    }

    set min_age(val) {
        this.minAge = val;
    }

    /**
     * le constructor est la méthode qui s'éxecute lors d'une nouvelle instance de notre classe 
    exemple:
    const newGame = new Boardgame(data);
    * @constructor
    * @param {Object} data - objet Json
    */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /* 
    Cette méthode de classe permet de retourner l'ensemble des jeux de société
    via une requête SQL
    */
    static async findAll() {

        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(game => new Boardgame(game));
    }

    /*
    Cette méthode de classe permet de retourner un jeu de société grâce à son ID
    via une requête SQL
    */
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);
        if (!rows[0]){
           throw new Error(`le jeu avec l'id ${id} n'existe pas `)
        }

        return new Boardgame(rows[0]);
    }

    /** 
    * Fonction non statique car propre à chaque instance
    * Elle permet de modifier un jeu de société  dans notre base de donnée
    * this correspond au contexte qui est utilisé
    * dans notre cas il correspond aux données de notre jeu de société avant modification
    * @param {json} data - Objet json venant modifier les données existantes
    */
    async updateById(data) {
        
        const { rows }= await db.query(`SELECT * FROM update_boardgame($1,$2);`,[data,this.id]);
        if (rows[0].id === null){
            throw new Error(`le jeu avec l'id ${this.id} n'existe pas `)
         }

        return new Boardgame(rows[0]);
    }

    /*
    fonction non statique car propre à chaque instance
    qui permet d'enregistrer un nouveau jeu de société dans notre base de donnée
    */
    async save() {
        
        const { rows } = await db.query(`SELECT * FROM new_boardgame($1);`, [this]); // minAge

        this.id = rows[0].id;
    }


    /* 
    fonction non statique car propre à chaque instance
    qui permet de supprimer un jeu en base de donnée grâce à son id
    */
      async deleteById() {

        const { rows }= await db.query(`DELETE FROM boardgame
                                        WHERE id = $1`,[this.id]);
    }

     
}

module.exports = Boardgame;