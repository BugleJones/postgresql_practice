const name = process.argv.slice[2];

if (process.argv.length <= 2) { return console.error('Please provide a name to look up'); }

var knex = require('knex')({
  client: 'pg',
  connection: {
    "user": "development",
    "password": "development",
    "database": "vagrant",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  }
});

knex.select()
.from('famous_people')
.where('first_name', name)
.orWhere('last_name', name)
.asCallback((err, results) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  results.forEach((result) => {
    console.log(`Found 1 person(s) by the name '${name}':
- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate}'`);
  });
});


// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
