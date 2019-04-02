const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const db = knex({
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
});

server.use(express.json());
server.use(helmet());

// endpoints here
// GET /api/zoos
// When the client makes a GET request to this endpoint, return a list of all the zoos in the database.
server.get('/api/zoos', async (req, res) => {
  try {
    const allAnimals = await db('zoos');
    res.json(allAnimals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving list of zoos' });
  }
});

// GET /api/zoos/:id
// When the client makes a GET request to /api/zoos/:id, find the zoo associated with the given id.
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos').where({ id: req.params.id });
    if (zoo.length) {
      res.status(200).json(zoo[0]);
    } else {
      res.status(404).json({ message: 'Invalid Id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Oops,something went wrong!' });
  }
});

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
