const knex = require('knex');
require('dotenv').config()

const db = knex({ //creates an instance of knex
    client: 'pg',
    connection: process.env.DB_URL
})

function findBySearchTerm(searchTerm){
    db.from('shopping_list').select('*')
    .where('name', 'ILIKE', `%${searchTerm}`)
    .then(result => console.log(result))
}

findBySearchTerm('burger'); //currently works

function paginate(page){
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);
    db.select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result))
}

paginate(4);

