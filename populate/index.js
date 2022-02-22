//61fea45a6a76dfc6545005c7
const { Post } = require("../models/Post");
const { Category, CategorySchema } = require("../models/Category");

const app = async () => {
  //   const post1 = new Post({
  //     title: "Aprender javascript con la consola",
  //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
  //     author: Types.ObjectId("61fea45a6a76dfc6545005c7"),
  //   });

  //   const data = await post1.save();
  //   console.log(data);

  // Populate tambien funciona con cadenas, se pasa los paths o campos que se desean unir
  // const posts = await Post.find({}).select("title author _id").populate("author")
  const posts = await Post.find({})
    .select("title author _id")
    .populate([
      {
        path: "author",
        select: {
          name: 1,
          surname: 1,
          profile_avatar: 1,
        },
      },
    ])
    .lean(); // reducir el tamaño de la query, transformando la query a un objeto plano

  //   for (const post of posts) {
  //     printPost(post);
  //   }

  //console.log(posts);

  //   const category1 = new Category({
  //     name: "Clases y Objectos",
  //     icon: "object",
  //     description: "Tópicos a la creación de clases y objectos en POO",
  //     category_id: "62142df7e6a01120264dd475",
  //   });

  //await category1.save();

  const categories = await Category.find({}).getSubCategories().lean();
  console.log(CategorySchema.path("name"))
  // const categories = await Category.find({}).populate("subcategories").lean();
  // console.log(categories)
  // console.log(categories[0].subcategories);

  // const addSubCategory = async (data) => {
  //   const { categoryParentId } = data;
  //   const category1 = new Category({
  //     name: "Encapsulamiento y polimorfismo",
  //     icon: "object",
  //     description: "Aprender sobre encapsular campos y polimorfinos en clases",
  //   });
    // await category1.save();
    // await Category.findByIdAndUpdate(categoryParentId, {
    //   $push: {
    //     subcategories: category1._id,
    //   },
    // });
  // };
  //addSubCategory({ categoryParentId: "62142df7e6a01120264dd475" });
};

function printPost(post) {
  const { _id, title, author } = post;
  console.log(`\nTítulo: ${title}`);
  console.log(`Autor: ${author.name} ${author.surname}`);
  console.log("-".repeat(50));
}

module.exports = app;
