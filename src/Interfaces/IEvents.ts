import { MessageData } from "./IData";

export interface ServerToClientEvents {
    serverMessage: (data: MessageData) => void;
    history: (a: MessageData[]) => void;
}

export interface ClientToServerEvents {
    clientMessage: (data: MessageData) => void;
}