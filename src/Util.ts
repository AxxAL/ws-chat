import { MessageData } from "./Interfaces/IData";

export function randString(length: number = 6) {
    const charString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let result = "";

    for (let i = 0; i <= length; i++) {
        result += charString[Math.floor(Math.random() * charString.length)];
    }

    return result;
}

export const logMessage = (data: MessageData) => console.log("[%s] %s >> %s", data.timestamp.split(" ")[0], data.sender.name, data.message);