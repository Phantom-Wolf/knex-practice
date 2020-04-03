// imports

require('dotenv').config();
const knex = require('knex');

// body

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL,
});

console.log('knex and driver installed correctly');

// knexInstance
// 	.from('shopping_list')
// 	.select('*')
// 	.then(result => {
// 		console.log(result);
// 	});

function searchByProductName(searchTerm) {
	knexInstance
		.select('id', 'name', 'price', 'date_added', 'category')
		.from('shopping_list')
		.where('name', 'ILIKE', `%${searchTerm}%`)
		.then(result => {
			console.log(result);
		});
}

searchByProductName('burger');

function paginateProducts(page) {
	const productsPerPage = 6;
	const offset = productsPerPage * (page - 1);

	knexInstance
		.select('id', 'name', 'price', 'category')
		.from('amazong_products')
		.limit(productsPerPage)
		.offset(offset)
		.then(result => {
			console.log(result);
		});
}

paginateItems(2);

function productsAddedDaysAgo(daysAgo) {
	knexInstance
		.select('id', 'name', 'price', 'date_added', 'checked', 'category')
		.from('shopping_list')
		.where(
			'date_added',
			'>',
			knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
		)
		.then(results => {
			console.log(results);
		});
}

productsAddedDaysAgo(5);

function costPerCategory() {
	knexInstance
		.select('category')
		.sum('price as total')
		.from('shopping_list')
		.groupBy('category')
		.then(result => {
			console.log(result);
		});
}

costPerCategory();
