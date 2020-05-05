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

// findBySearchTerm('burger'); //currently works

function paginate(page){
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);
    db.select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result))
}

// paginate(4);

function getAfterDate(daysAgo) {
    db.select('*')
    .from('shopping_list')
    .where(
        'date_added',
        '>',
        db.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => console.log(result))
}

// getAfterDate(3);

function totalCost() {
    db.select('category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price AS total')
    .then(result => console.log(result))
}

// totalCost()