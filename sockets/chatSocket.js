const onlineUsers = require("./onlineUsers");

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join", (userId) => {

            console.log("User joined:", userId);
            onlineUsers[userId] = socket.id;
            console.log("onlineUsers", onlineUsers);
        });

        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const receiverSocketId = onlineUsers[receiverId];

            console.log(onlineUsers);
            console.log(text);
            
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", {
                    senderId,
                    text
                });
            } else {
                console.log("Receiver not online");
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);

            for (let userId in onlineUsers) {
                if (onlineUsers[userId] === socket.id) {
                    delete onlineUsers[userId];
                }
            }
        });
    });
};

module.exports = chatSocket;