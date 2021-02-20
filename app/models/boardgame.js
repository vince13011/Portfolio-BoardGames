const db = require('../database');

class Boardgame {
    id;
    name;
    // camelCase ici, snake_case côté BDD
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

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {

        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(game => new Boardgame(game));
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);
        if (!rows[0]){
           throw new Error(`le jeu avec l'id ${id} n'existe pas `)
        }

        return new Boardgame(rows[0]);
    }

    /** 
    * fonction non statique car propre à chaque instance
    * @param {json} data - Objet json venant modifier la donnée existante
    */
    async updateById(data) {
        
        const { rows }= await db.query(`SELECT * FROM update_boardgame($1,$2);`,[data,this.id]);
        if (rows[0].id === null){
            throw new Error(`le jeu avec l'id ${this.id} n'existe pas `)
         }

        return new Boardgame(rows[0]);
    }

    // fonction non statique car propre à chaque instance
    async save() {
        // props de this => insérer une ligne dans la bdd
        const { rows } = await db.query(`SELECT * FROM new_boardgame($1);`, [this]); // minAge

        this.id = rows[0].id;
    }


    // fonction non statique car propre à chaque instance
      async deleteById() {


        const { rows }= await db.query(`DELETE FROM boardgame
                                        WHERE id = $1`,[this.id]);
    }

     
}

module.exports = Boardgame;