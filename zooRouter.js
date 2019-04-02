const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
});

// endpoints here
// GET /api/zoos
// When the client makes a GET request to this endpoint, return a list of all the zoos in the database.
router.get("/", async (req, res) => {
    try {
        const allAnimals = await db("zoos");
        res.json(allAnimals);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving list of zoos" });
    }
});

// GET /api/zoos/:id
// When the client makes a GET request to /api/zoos/:id, find the zoo associated with the given id.
router.get("/:id", async (req, res) => {
    try {
        const zoo = await db("zoos").where({ id: req.params.id });
        if (zoo.length) {
            res.status(200).json(zoo[0]);
        } else {
            res.status(404).json({ message: "Invalid Id" });
        }
    } catch (error) {
        res.status(500).json({ message: "Oops, something went wrong!" });
    }
});

// POST /api/zoos
// When the client makes a POST request to this endpoint, a new zoo should be created in the zoos table.
router.post("/", async (req, res) => {
    try {
        const [id] = await db("zoos").insert(req.body);

        const zoo = await db("zoos")
            .where({ id })
            .first();

        res.status(201).json(zoo);
    } catch (error) {
        res.status(500).json({ message: "Oops, we ran into an error" });
    }
});

// PUT /api/zoos/:id
// When the client makes a PUT request to this endpoint passing an object with the changes,
// the zoo with the provided id should be updated with the new information.
router.put("/:id", async (req, res) => {
    try {
        const count = await db("zoos")
            .where({ id: req.params.id })
            .update(req.body);

        if (count > 0) {
            res.status(200).json();
        } else {
            res.status(200).json();
        }
        res.status(404).json({ message: "Id not found" });
    } catch (error) {
        res.status(500).json({ message: "Oops, we ran into an error" });
    }
});

// DELETE /api/zoos/:id
// When the client makes a DELETE request to this endpoint, the zoo that has the provided id should be removed from the database.
router.delete("/:id", async (req, res) => {
    try {
        const count = await db("zoos")
            .where({ id: req.params.id })
            .del();

        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Id not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Oops, we ran into an error" });
    }
});


module.exports = router;