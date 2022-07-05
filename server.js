const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: `${__dirname}/.env` });

console.log("DB", process.env);
console.log("DB", process.env.DATABASE);

// create URL for DB from .env
const DB = process.env.DATABASE.replace(
  "{%PASSWORD%}",
  process.env.DATABASE_PASSWORD
);

// create mongoose connection
mongoose.connect(DB).then(() => console.log("DB connected"));

// instantiate app from index.js (normally app.js)
const app = require("./index");

// define PORT
const PORT = process.env.PORT || 3000;

// make app listen and instantiate server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
