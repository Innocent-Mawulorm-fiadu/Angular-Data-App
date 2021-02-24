module.exports = () => {
var faker = require('faker');
var database = { products: []};

for (var i = 1; i<= 300; i++) {
  database.products.push({
    id: i,
    name: faker.finance.accountName(),
    account:faker.finance.account(12),
    date: faker.date.past().toLocaleString(),
    price: faker.commerce.price(),
    amount:faker.finance.amount(),
    type:faker.finance.transactionType(),
    branch: faker.address.city()
  });
}

// console.log(JSON.stringify(database));
return database
}
