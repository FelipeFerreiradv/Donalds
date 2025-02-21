import { FastifyInstance } from "fastify";
import { prisma } from "./prisma/prisma";

// interface routesProps {
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   menuCategoryId: string;
//   restaurantId: string;
//   ingredients: [];
// }

export const routes = async (api: FastifyInstance) => {
  // restaurant
  api.get("/restaurant", async (req) => {
    let restaurants = [];

    const query = req.query;

    if (query) {
      restaurants = await prisma.product.findMany({
        where: {
          name: req.query.name,
          description: req.query.description,
          price: req.query.price,
          imageUrl: req.query.imageUrl,
          menuCategoryId: req.query.menuCategoryId,
          restaurantId: req.query.restaurantId,
          ingredients: req.query.ingredients,
        },
      });
    } else {
      restaurants = await prisma.restaurant.findMany();
    }

    return restaurants;
  });

  api.post("/restaurant", async (reply, req) => {
    const { name, slug, description, avatarImageUrl, coverImageUrl } = req.body;

    await prisma.restaurant.create({
      date: {
        name,
        slug,
        description,
        avatarImageUrl,
        coverImageUrl,
      },
    });

    console.log(req.body);

    return reply.status(201).send();
  });

  api.get("/", async () => {
    return "Hello world";
  });
};
