// imports

const ShoppingService = require('../src/shopping-list-service');
const knex = require('knex');

// tests

describe(`shopping list service object`, function() {
	let db;
	let testItems = [
		{
			id: 1,
			name: 'item one',
			price: '1.11',
			checked: false,
			category: 'Main',
			date_added: new Date('2029-01-22T16:28:32.615Z'),
		},
		{
			id: 2,
			name: 'item two',
			price: '2.22',
			checked: false,
			category: 'Lunch',
			date_added: new Date('2019-01-22T16:28:32.615Z'),
		},
		{
			id: 3,
			name: 'item three',
			price: '3.33',
			checked: false,
			category: 'Snack',
			date_added: new Date('2009-01-22T16:28:32.615Z'),
		},
	];

	before(() => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL,
		});
	});

	before(() => db('shopping_list').truncate());

	afterEach(() => db('shopping_list').truncate());

	after(() => {
		db.destroy();
	});

	context(`Given 'shopping_list' table has data`, () => {
		beforeEach(() => {
			return db.into('shopping_list').insert(testItems);
		});

		it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
			return ShoppingService.getAllItems(db).then(actual => {
				expect(actual).to.eql(testItems);
			});
		});

		it(`getById() resolves and item by 'id' from 'shopping_list' table`, () => {
			const thirdId = 3;
			const thirdTestItem = testItems[thirdId - 1];
			return ShoppingService.getById(db, thirdId).then(actual => {
				expect(actual).to.eql({
					id: thirdTestItem.id,
					name: thirdTestItem.name,
					price: thirdTestItem.price,
					checked: thirdTestItem.checked,
					category: thirdTestItem.category,
					date_added: thirdTestItem.date_added,
				});
			});
		});

		it(`updateItem() updates an item from the 'shopping_list' table`, () => {
			const idOfItemToUpdate = 3;
			const newItemData = {
				name: 'updated title',
				price: '4.44',
				checked: false,
				category: 'Main',
				date_added: new Date(),
			};
			return ShoppingService.updateItem(db, idOfItemToUpdate, newItemData)
				.then(() => ShoppingService.getById(db, idOfItemToUpdate))
				.then(item => {
					expect(item).to.eql({
						id: idOfItemToUpdate,
						...newItemData,
					});
				});
		});

		it(`deleteItem() removes item by 'id' from 'shopping_list' table`, () => {
			const thirdId = 3;
			ShoppingService.deleteItem(db, thirdId)
				.then(ShoppingService.getAllItems(db))
				.then(allItems => {
					const expected = testItems.filter(
						item => item.id !== thirdId
					);
					expect(allItems).to.eql(expected);
				});
		});
	});

	context(`Given 'shopping_list' table has no data`, () => {
		it(`getAllItems() resolves an empty array`, () => {
			return ShoppingService.getAllItems(db).then(actual => {
				expect(actual).to.eql([]);
			});
		});

		it(`insertNewItem() inserts a a new item and resolves new item with an 'id'`, () => {
			const newItem = {
				name: 'new item',
				price: '1.11',
				checked: false,
				category: 'Main',
				date_added: new Date('2039-01-22T16:28:32.615Z'),
			};
			return ShoppingService.insertNewItem(db, newItem).then(actual => {
				expect(actual).to.eql({
					id: 1,
					name: newItem.name,
					price: newItem.price,
					checked: newItem.checked,
					category: newItem.category,
					date_added: newItem.date_added,
				});
			});
		});
	});
});
