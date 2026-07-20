// ------------------------------------------------------components------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 686c9df23e83f4c123456789
 *         name:
 *           type: string
 *           example: John Wick
 *         username:
 *           type: string
 *           example: johnwick
 *         email:
 *           type: string
 *           format: email
 *           example: john@gmail.com
 *         avatar:
 *           type: string
 *           format: uri
 *           example: https://example.com/avatar.jpg
 *         isOnline:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

//------------------------------------------------------ register--------------------
/**
 * @swagger
 * /user/register:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Register user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Johe
 *                          username:
 *                              type: string
 *                              example: john-wick
 *                          email:
 *                              type: string
 *                              example: john@gmail.com
 *                          password:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                              format: uri
 *                              example: https://example.com/profile.jpg
 *      responses:
 *          200:
 *              description: User registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              data:
 *                                  $ref: '#/components/schemas/User'
 *          400:
 *              description: Email already exists
 */

//-------------------------------------------------------------- login--------------------
/**
 * @openapi
 * /user/login:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Login user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          loginId:
 *                              type: string
 *                          loginPassword:
 *                              type: string
 *      responses:
 *          200:
 *              description: login successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              data:
 *                                  $ref: '#/components/schemas/User'           
 *          404:
 *              description: Invalid credentials
 *          401:
 *              description: Invalid password
 */

// ------------------------------------------------get user list-----------------
/**
 * @openapi
 * /user:
 *      get:
 *          tags:
 *              - Users
 *          summary: get user list
 *          security:
 *              - cookieAuth: []
 *          parameters:
 *              - in: query
 *                name: searchUser
 *                required: true
 *                schema:
 *                    type: string
 *                description: username or email of users
 *          responses:
 *              200:
 *                  description: User list fetched successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  message:
 *                                      type: string
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/User'                                    
 */

// ------------------------------------------------Logout user-----------------
/**
 * @openapi
 * /user/logout:
 *  post:
 *      tags:
 *          - Users
 *      summary: logout user
 *      security:
 *          - cookieAuth: []
 *      responses:
 *          200:
 *              description: Logged out successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              success: 
 *                                  type: boolean
 *                              message:
 *                                  type: string
 */