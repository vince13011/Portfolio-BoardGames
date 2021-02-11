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

        return new Boardgame(rows[0]);
    }

    static async updateById(id, data) {
        const { rows }= await db.query(`UPDATE boardgame
                                    SET "name" = $2, 
                                        min_age = $3,
                                        min_players = $4,
                                        max_players = $5,
                                        type = $6,
                                        note = $7,
                                        duration = $8 ,                          
                                        creator = $9
                                    WHERE id = $1 RETURNING *;`,[id, data.name, data.minAge, data.minPlayers, data.maxPlayers, data.type, data.note, data.duration, data.creator]);
        
        return new Boardgame(rows[0]);
    }

    // pas statique car propre à chaque instance
    async save() {
        // props de this => insérer une ligne dans la bdd
        const { rows } = await db.query(`SELECT * FROM new_boardgame($1);`, [this]); // minAge

        this.id = rows[0].id;
    }

     
}

module.exports = Boardgame;