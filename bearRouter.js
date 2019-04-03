const express = require("express");
const router = express.Router();
const knex = require("knex");

const db = knex({
  client: "sqlite",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
});

// endpoints here
// GET /api/bears
router.get("/", async (req, res) => {
  try {
    const allBears = await db("bears");
    res.json(allBears);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving list of bears" });
  }
});

// GET /api/bears/:id
router.get("/:id", async (req, res) => {
  try {
    const bear = await db("bears").where({ id: req.params.id });
    if (bear.length) {
      res.status(200).json(bear[0]);
    } else {
      res.status(404).json({ message: "Invalid Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Oops, something went wrong!" });
  }
});

// POST /api/bears
router.post("/", async (req, res) => {
  try {
    const [id] = await db("bears").insert(req.body);

    const bear = await db("bears")
      .where({ id })
      .first();

    res.status(201).json(bear);
  } catch (error) {
    res.status(500).json({ message: "Oops, we ran into an error" });
  }
});

// PUT /api/bears/:id
router.put("/:id", async (req, res) => {
  try {
    const count = await db("bears")
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

// DELETE /api/bears/:id
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("bears")
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
