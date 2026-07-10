const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "One-to-One Chat API",
            version: "1.0.0",
            description: "WhatsApp Clone API Documentation"
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
                description: "Development Server",
            },
        ],
        components: {
            responses: {
                DatabaseError: {
                    description: 'Database Error'
                },
                TaskNotFound: {
                    description: 'Task Not Found'
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
    apis: ["./swagger/*.swagger.js"]
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)
module.exports = swaggerSpec