import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
// import UndoIcon from "@mui/icons-material/Undo";
// import RedoIcon from "@mui/icons-material/Redo";

const Board = () => {
  //creates a reference to the canvas element in the DOM
  const canvasRef = useRef(null);
  //creates a state variable to store the Fabric.js canvas once it is initialized
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    //This function run s when the component mounts
    if (canvasRef.current) {
      //initializes the Fabric.js canvas
      console.log("initing");
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight;
      const canvas = new fabric.Canvas(canvasRef.current, {
        height: height,
        width: parentWidth,
        isDrawingMode: true,
      });
      setFabricCanvas(canvas);
      console.log("initing done");
      console.log(canvas);

      //detecting whiteboard changes
      canvas.on("after:render", (e) => {
        console.log("After render", canvas);
        setFabricCanvas(canvas); // save canvas to database
      });

      //This is the cleanup function that runs when the component unmounts.
      //It disposes of the Fabric.js canvas to free up resources.
      //Do this to avoid unexpected behavior when the component unmounts
      return () => {
        canvas.dispose();
      };
    }
  }, [canvasRef]);

  const clearBoard = () => {
    console.log("clearBoard");
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.isDrawingMode = true;
    }
  };

  function handlePencilIconClick() {
    if (fabricCanvas) {
      console.log("In drawing mode");
      fabricCanvas.isDrawingMode = true;
    }
  }

  function handleTextIconClick() {
    if (fabricCanvas) {
      console.log("In writing mode");
      fabricCanvas.isDrawingMode = false;
      //add text
      //random left and top values between 50 and 100
      const left_value = Math.floor(Math.random() * 50) + 50;
      const top_value = Math.floor(Math.random() * 50) + 50;
      fabricCanvas.add(
        new fabric.IText("Tap and Type", {
          left: left_value,
          top: top_value,
          fontFamily: "arial black",
          fill: "#333",
          fontSize: 50,
        })
      );
    }
  }

  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
      <div className="toolbar">
        <div className="toolbar-icons">
          <IconButton
            aria-label="pencil"
            onClick={() => handlePencilIconClick()}
          >
            <CreateIcon />
          </IconButton>

          <IconButton aria-label="text" onClick={() => handleTextIconClick()}>
            <TitleIcon />
          </IconButton>
          {/* need to add IconButton for clear board maybe add an eraser */}
          <button onClick={() => clearBoard()}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
