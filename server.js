const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "{%PASSWORD%}",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connected"));

const app = require("./index");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
