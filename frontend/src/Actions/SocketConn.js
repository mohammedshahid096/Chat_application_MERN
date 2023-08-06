// !socket related
import socketIO from "socket.io-client";
import Store from "../Store";
import { RECEIVED_SOCKET_MESSAGE } from "../Constants/Message.constant";
const ENDPOINT = "http://127.0.0.1:8080";
let socket = socketIO(ENDPOINT, { transports: ["websocket"] });

export const InitiateSocketConnection = (user) => {
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.emit("setup", user);
};

export const JoinUserChatSocket = (userjoin) => {
  socket.emit("join chat", userjoin);
};

// export const NewMessageRecieved = () => {
socket.on("message recieved", (MessageRecieved) => {
  // const dispatch = useDispatch();
  console.log("getting from server ");
  console.log(MessageRecieved);
  Store.dispatch({
    type: RECEIVED_SOCKET_MESSAGE,
    payload: MessageRecieved,
  });
});
// };

export const SendMessageSocket = (data) => {
  socket.emit("new message", data);
};
