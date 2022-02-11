require("dotenv").config();

const connection = require("./helpers/mongodb");
const schemas = require("./schemas");
const methods = require("./static and instace methods");

(async () => {
  await connection();
  await methods();
})();
