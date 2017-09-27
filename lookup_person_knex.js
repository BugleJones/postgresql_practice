const db = require('./db')
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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  client.query("SELECT id,first_name,last_name, birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text" , [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found 1 person(s) by the name '${name}':
- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate}'`);
    client.end();
  });


// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
