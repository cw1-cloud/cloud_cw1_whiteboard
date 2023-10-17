import React from "react";
import PencilTool from "../components/pencilTool";
import TextTool from "../components/TextTool";

const Toolbar = () => {
  const toolbarStyle = {
    background: "lightgray",
    padding: "10px",
  };

  return (
    <div style={toolbarStyle}>
      <PencilTool />
      <TextTool style={{ fontSize: "30px" }} />
    </div>
  );
};

export default Toolbar;
