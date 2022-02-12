require("dotenv").config();

const connection = require("./helpers/mongodb");
const schemas = require("./schemas");
const methods = require("./static and instace methods");
const virtuals = require("./virtuals");

(async () => {
  console.clear();
  await connection();
  await virtuals();
})();
