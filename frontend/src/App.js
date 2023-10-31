import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.scss";
import Board from "./components/Board";
import Header from "./components/Header";

const socket = io.connect("http://localhost:3001/");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [action, setAction] = useState("drawing");

  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <Header />
      <Board />

      {/* <input
        placeholder="message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message:</h1>
      {messageReceived} */}
    </div>
  );
}

export default App;
