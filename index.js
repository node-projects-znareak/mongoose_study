require("dotenv").config();

const schemas = require("./schemas");

(async () => {
  console.clear();
  await schemas();
})();
