require("dotenv").config();

const schemas = require("./schemas");
const methods = require("./static and instace methods");

(async () => {
  await methods();
})();
