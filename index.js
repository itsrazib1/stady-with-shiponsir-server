const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DU_PASS}@cluster0.4hmio3i.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client
      .db("shiponponsir")
      .collection("studentsetails");
    const logindataCollection = client
      .db("shiponponsir")
      .collection("logindata");

    // studentsetails start
    app.get("/studentsetails", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/studentsetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    });

    app.post("/studentsetails", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result);
    });

    app.put("/studentsetails/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoffee = req.body;

      const coffee = {
        $set: {
          name: updatedCoffee.name,
          quantity: updatedCoffee.quantity,
          supplier: updatedCoffee.supplier,
          taste: updatedCoffee.taste,
          category: updatedCoffee.category,
          details: updatedCoffee.details,
          photo: updatedCoffee.photo,
        },
      };

      const result = await coffeeCollection.updateOne(filter, coffee, options);
      res.send(result);
    });

    app.delete("/studentsetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    });
    // studentsetails end

    // logindata start
    app.get("/logindata", async (req, res) => {
      const cursor = logindataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/logindata/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await logindataCollection.findOne(query);
      res.send(result);
    });

    app.post("/logindata", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
      const result = await logindataCollection.insertOne(newCoffee);
      res.send(result);
    });

    app.put("/logindata/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedlogindata = req.body;

      const coffee = {
        $set: {
          name: updatedlogindata.name,
          quantity: updatedlogindata.quantity,
          supplier: updatedlogindata.supplier,
          taste: updatedlogindata.taste,
          category: updatedlogindata.category,
          details: updatedlogindata.details,
          photo: updatedlogindata.photo,
        },
      };

      const result = await coffeeCollection.updateOne(filter, coffee, options);
      res.send(result);
    });

    app.delete("/logindata/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await logindataCollection.deleteOne(query);
      res.send(result);
    });
    // logindata end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("stady-with-shiponsir-server is running");
});

app.listen(port, () => {
  console.log(`stady-with-shiponsir-server is running on port: ${port}`);
});
