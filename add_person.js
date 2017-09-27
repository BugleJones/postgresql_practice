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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

knex('famous_people').insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: birthDate
})
.returning('id')
.then((id) => {
  console.log('New record inserted ' + id);
});

knex.destroy();
