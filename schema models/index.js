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

  const find2 = await Coords.find({})
    .where("y")
    .gte(5000)
    .lte(6000)
    .select("y -_id");
  //console.log(find2);

  const updated2 = await Coords.findOneAndUpdate(
    { _id: "6217e8591814df8a32eb382e" },
    { z: 300 },
    { isNew: true }
  );
  //console.log(updated2);

  coords1.save((err, doc) => {
    if (err) throw new Error(err);
    console.log("Guardado!");
    console.log(doc);
  });
}

module.exports = app;
