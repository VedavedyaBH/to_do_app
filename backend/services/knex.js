const knex = require("knex");
const knexFile = require("../knexFile");

module.exports = (settings) =>{
    if (!settings){
        settings = knexFile;
        return new knex(settings)
    }
}