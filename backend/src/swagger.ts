import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Magichess",
      version: "1.0.0",
      description: "API documentation for Magichess",
    },
    paths: {},
  },
  apis: [path.join(__dirname, "./routes/*.routes.js")], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
