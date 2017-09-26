const pg = require("pg");
const settings = require("./settings"); // famous_people.sql
const name = process.argv[2];

if (process.argv.length <= 2) { return console.error('please provide an name to look up'); }

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  client.query("SELECT id,first_name,last_name, to_char(birthdate, 'YYYY/MM/DD') AS birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text" , [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found 1 person(s) by the name '${name}':
- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate}'`);
    client.end();
  });
});

// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
