const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a1c987041541f69f245e9d0",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data is initialised");
};

initDB();
