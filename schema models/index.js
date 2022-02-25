const Coords = require("../models/Coords");
const { randomNumber } = require("../helpers/utils");

async function app() {
  const coords1 = new Coords({
    x: randomNumber(1, 10000),
    y: randomNumber(1, 10000),
  });

  //   const data = await coords1.save();
  //   console.log(data);

  // >2000 && <5000
  const allCoords = await Coords.find({}).where("x").gt(2000).lt(5000).lean();
  //console.log(allCoords);

  const updated = await Coords.findByIdAndUpdate("6217e842164c6d60068a7e6b", {
    x: 100,
  });
  // console.log(updated)

  const find = await Coords.find({}).where("y").eq(9939);
  //const find = await Coords.findOne({y:9939})
  //   console.log(find);

  // await Coords.deleteOne({x: 1693})
  const remove = await Coords.deleteOne({}).where("x").eq(1693);
  //   console.log(remove);

  const find2 = await Coords.find({}).where("y").gte(5000).lte(6000).select("y -_id");
  console.log(find2);
}

module.exports = app;
