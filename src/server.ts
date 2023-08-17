import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./Interfaces/IEvents";
import { MessageData, UserData } from "./Interfaces/IData";
import { logMessage, randString } from "./Util";

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    MessageData,
    UserData
>(3000, {
    cors: {
        origin: "*"
    }
});

const history: MessageData[] = [];

io.on("connection", socket => {

    if (history.length > 0) {
        socket.emit("history", history);
    }

    socket.data.name = `Anon#${randString()}`;
    
    emitAdminMessage(`${socket.data.name} has joined the chat.`);

    socket.on("clientMessage", data => emitUserMessage(socket, data));

    socket.on("disconnect", () => emitAdminMessage(`${socket.data.name} has left the chat.`));
    
});

function emitUserMessage(socket: any,data: MessageData) {
    data.timestamp = new Date().toTimeString();
    data.sender = socket.data;
    io.emit("serverMessage", data);
    history.push(data);
    logMessage(data);
}

function emitAdminMessage(text: string) {
    const msg: MessageData = {
        message: text,
        sender: { name: "Server" },
        timestamp: new Date().toTimeString()
    };
    io.emit("serverMessage", msg);
    history.push(msg);
    logMessage(msg);
}