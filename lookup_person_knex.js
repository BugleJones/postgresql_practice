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

const name = process.argv.slice(2);

knex.select()
.from('famous_people')
.where({
  first_name: name[0]
})
.orWhere({
  last_name: name[0]
})
.asCallback((err, person) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log("Searching...");
    if (person === null) {
      console.log("No record found");
    } else {
      person.forEach((result) => {
        console.log(`Found 1 person(s) by the name '${name}':
    - ${result.id}: ${result.first_name} ${result.last_name}, born '${result.birthdate}'`);
      });
    knex.destroy();
    }
  });

// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'
