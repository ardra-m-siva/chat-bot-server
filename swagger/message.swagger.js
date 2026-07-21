// components
/**
 * @openapi
 * components:
 *  schemas:
 *      Messages:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: 686c9df23e83f4c123456789
 *              chat:
 *                  type string
 *                  example: 686c9df23e83f4c123456789
 *              senderId:
 *                  type: string
 *                  example: 686c9df23e83f4c123456789
 *              text:
 *                  type: string
 *              messageType:
 *                  type: string
 *                  enum:
 *                      - text
 *                      - image
 *                      - video
 *                      - file
 *                  example: text
 *              status:
 *                  type: string
 *                  enum:
 *                      - sent
 *                      - delivered
 *                      - seen
 *                  example: sent
 *              media:
 *                  type: string
 *                  format: uri
 */

// send a message to an another user
/**
 * @swagger
 * /messages:
 *  post:
 *      tags: 
 *          - Messages
 *      summary: sent a message to a paticular user
 *      security:
 *          - cookieAuth: []
 *      requestBody:
 *          required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - chatId
 *                          properties:
 *                              chatId:
 *                                  type: string
 *                                  example: 687b5d5b3ef9a94a0f8d8a52
 *                              text:
 *                                  type: string
 *                                  description: Required if no media file is uploaded.
 *                              messageType:
 *                                  type: string
 *                                  enum:
 *                                      - text
 *                                      - image
 *                                      - video
 *                                      - file
 *                                  example: image
 *                                  description: |
 *                                      - `text`: media is optional.
 *                                      - `image`, `video`, `file`: media is required.
 *                              media:
 *                                  type: string
 *                                  format: binary
 *                                  description: Required for image, video and file messages.
 *      responses:
 *          200:
 *          400:
 *              description: Validation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                      examples:
 *                          noTextOrMedia:
 *                              summary: Neither text nor media provided
 *                              value:
 *                                  success: false
 *                                  message: Either text or media file is required
 *                          mediaRequired:
 *                              summary: Media missing for media message
 *                              value:
 *                                  success: false  
 *                                  message: image messages require a media file.
 *
 *
 */

// get all messages in a particular chat
/**
 * @openapi
 * /messages:
 *  get:
 *      tags:
 *          - Messages
 *      summary: get all messages in a particular chat with the user
 *      security:
 *          - cookieAuth: []
 *      requestBody:
 *          required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              chatId:
 *                                  type: string
 *                                  example: 686c9df23e83f4c123456789
 *
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              default: 10
 *            example: 5
 *            description: Number of items per page
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              default: 1
 *            example: 2
 *            description: Page number
 *      responses:
 *          200:
 *              description: Messages fetched successfully
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
 *                                  $ref: '#/components/schemas/Messages'
 *          403:
 *              description: You are not authorized to access this chat.
 *          404: 
 *              description: chat not found!
 */
