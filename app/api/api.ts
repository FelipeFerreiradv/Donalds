import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./routes";

export const api = fastify({ logger: false });

api.setValidatorCompiler(validatorCompiler);
api.setSerializerCompiler(serializerCompiler);

api.register(fastifyCors, { origin: "*" });

api.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Donalds API",
      version: "1.0.0",
    },
  },
});

api.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

api.register(routes);

try {
  api.listen({
    port: 3333,
  });
} catch {
  throw new Error();
}
