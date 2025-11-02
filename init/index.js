const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGO_URL = process.env.MONGO_URI || process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(" Connected to MongoDB for seeding!");

    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log(" Data successfully initialized!");

    mongoose.connection.close();
    console.log(" Database connection closed.");
  } catch (err) {
    console.error(" Error initializing database:", err.message);
  }
}

main();
