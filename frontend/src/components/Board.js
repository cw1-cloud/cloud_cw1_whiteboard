import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import { socket } from "../hooks/socket";

const Board = () => {
  //creates a reference to the canvas element in the DOM
  const canvasRef = useRef(null);
  //creates a state variable to store the Fabric.js canvas once it is initialized
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    //This function runs when the component mounts
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
      console.log("initing done");
      setFabricCanvas(canvas);
      //This is the cleanup function that runs when the component unmounts.
      //It disposes of the Fabric.js canvas to free up resources.
      //Do this to avoid unexpected behavior when the component unmounts
      return () => {
        canvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // Parse JSON and add objects to canvas

    if (fabricCanvas) {
      fabricCanvas.on("object:added", handleCanvasChange);
      fabricCanvas.on("object:modified", handleCanvasChange);
      fabricCanvas.on("object:removed", handleCanvasChange);
    }

    function handleCanvasChange(e) {
      console.log("Canvas changed", fabricCanvas);
      //get the canvas state convert to json
      const json = JSON.stringify(fabricCanvas);
      //send the json to the backend
      socket.emit("canvas-data", json);
    }
  }, [fabricCanvas]);

  useEffect(() => {
    socket.on("get-canvas-data", (data) => {
      const canvasState = JSON.parse(data);
      console.log("getting canvas state", canvasState.objects);
      if (canvasState && canvasState.objects) {
        canvasState.objects.forEach((object) => {
          if (object.type === "path") {
            console.log("add path");
            const path = new fabric.Path(object.path, {
              left: object.left,
              top: object.top,
              fill: object.fill,
              stroke: object.stroke,
              strokeWidth: object.strokeWidth,
              strokeDashArray: object.strokeDashArray,
              strokeDashOffset: object.strokeDashOffset,
              strokeUniform: object.strokeUniform,
              strokeMiterLimit: object.strokeMiterLimit,
              visible: object.visible,
              backgroundColor: object.backgroundColor,
              strokeLineCap: object.strokeLineCap,
              strokeLineJoin: object.strokeLineJoin,
              scaleX: object.scaleX,
              scaleY: object.scaleY,
              angle: object.angle,
              flipX: object.flipX,
              flipY: object.flipY,
              opacity: object.opacity,
              shadow: object.shadow,
              fillRule: object.fillRule,
              paintFirst: object.paintFirst,
              globalCompositeOperation: object.globalCompositeOperation,
              skewX: object.skewX,
              skewY: object.skewY,
            });
            if (fabricCanvas) {
              fabricCanvas.add(path);
            }
          }
        });
      }
    });
  }, [fabricCanvas]);

  const clearBoard = () => {
    console.log("clearBoard");
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.isDrawingMode = true;

      // I want to delete from the nosql database
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
// const path = new fabric.Path(
//   "M 818.999 586.999 Q 819 587 821.5 587 Q 824, 587, 830, 588.5 Q 836 590 841 592 Q 846 594 853.5 599 Q  861 604 878 616.5 L 895.001 629.001",
//   {
//     left: 818.5,
//     top: 586.5,
//     fill: null,
//     stroke: "rgb(0, 0, 0)",
//     strokeWidth: 1,
//     strokeLineCap: "round",
//     strokeLineJoin: "round",
//     scaleX: 1,
//     scaleY: 1,
//     angle: 0,
//     flipX: false,
//     flipY: false,
//     opacity: 1,
//   }
// );
