import { useEffect, useState } from "react";
import "./App.scss";
import Board from "./components/Board";
import Header from "./components/Header";
import { socket } from "./hooks/socket";
import WelcomeModal from "./components/welcomeModal";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <WelcomeModal open={open} handleClose={handleClose}  />

      <Header />
      <Board />
    </div>
  );
}

export default App;
