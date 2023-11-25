import { useState } from "react";
import "./App.scss";
import Board from "./components/Board";
import Header from "./components/Header";
import { socket } from "./hooks/socket";
import WelcomeModal from "./components/welcomeModal";

function App() {
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");

  const handleNameSubmit = (userName) => {
    setUserName(userName);
    if (userName) {
      socket.connect();
      socket.emit("register", userName);
    }
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Header userName={userName} />
      <Board />
      {showModal && (
        <WelcomeModal
          onSubmitName={handleNameSubmit}
          open={showModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
