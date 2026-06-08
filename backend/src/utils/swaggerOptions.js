const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SRJ Corporate Website Backend API",
      version: "1.0.0",
      description: "API documentation for the SRJ Global Technologies backend"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};

export default swaggerOptions;
