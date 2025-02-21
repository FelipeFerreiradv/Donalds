"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import cors_1 from "@fastify/cors";
var fastify_1 = require("fastify");
var fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
var api = (0, fastify_1.default)({ logger: true });
api.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
api.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
api.register(cors_1.default, { origin: "*" });
api.get("/", function () {
  return "Hello world";
});
try {
  api.listen({
    port: 3333,
    api,
  });
} catch (_a) {
  throw new Error();
}
