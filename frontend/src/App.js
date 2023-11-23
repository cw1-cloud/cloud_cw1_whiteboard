import { useState } from "react";
import "./App.scss";
import Board from "./components/Board";
import Header from "./components/Header";
import { socket } from "./hooks/socket";
import WelcomeModal from "./components/welcomeModal";

function App() {
  const [showModal, setShowModal] = useState(true);

  const handleNameSubmit = (userName) => {
  
    if (userName) {
      socket.emit("register", userName);
    }
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      {showModal && (
        <WelcomeModal onSubmitName={handleNameSubmit} open={handleClose} />
      )}
      <Header />
      <Board />
    </div>
  );
}

export default App;
