// components 
/**
 * @swagger
 * components:
 *  schemas:
 *      Chats:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: 686c9df23e83f4c123456789
 *              participants:
 *                  type: array
 *                  items:
 *                      type: string
 *                  example:
 *                      - "687b5d5b3ef9a94a0f8d8a52"
 *                      - "687b5d5b3ef9a94a0f8d8a54"
 *              lastMessage:
 *                  type: string
 *                  example: 687b5d5b3ef9a94a0f8d8a52
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 */

// get the list of chats
/**
 * @swagger
 * /chats:
 *  get:
 *      tags:
 *          - Chats
 *      summary: Get chat list
 *      security:
 *          - cookieAuth: []
 *      responses:
 *          200:
 *              description: Chat fetched successfully.
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
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Chats' 
 *          500:
 *              description: Internal server error
 */

// create a new chat with a user or fetch the existing chat 
/**
 * @swagger
 * /chats:
 *  post:
 *      tags: 
 *          - Chats
 *      summary: Create a new chat with a user or get the existing chat
 *      security:
 *          - cookieAuth: []
 *      parameters:
 *          - in: query
 *            name: receiverId
 *            required: true
 *            schema:
 *              type: string
 *            description: the _id of the receiver
 *      responses:
 *          200:
 *              description: Existing chat returned or new chat created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                                  example: chat fetched successfully
 *                              data:
 *                                  $ref: '#/components/schemas/Chats'
 *          404:
 *              descriprion: User Not Found!
 */