require("dotenv").config();

const connection = require("./helpers/mongodb");
const schemas = require("./schemas");
const methods = require("./static and instace methods");
const virtuals = require("./virtuals");
const models = require("./schema models");
const populate = require("./populate");

(async () => {
  console.clear();
  await connection();

  await models();
})();
