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
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight;
      const canvas = new fabric.Canvas(canvasRef.current, {
        height: height,
        width: parentWidth,
        isDrawingMode: true,
      });

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
    if (fabricCanvas) {
      fabricCanvas.on("path:created", handleCanvasChange); //event for drawing
      fabricCanvas.on("text:changed", handleCanvasChange); //event for writing
      fabricCanvas.on("object:modified", handleCanvasChange); //event for modifying
    }

    function handleCanvasChange(e) {
      const json = JSON.stringify(fabricCanvas); //get the canvas state convert to json
      //send the json to the backend
      socket.emit("canvas-data", json);
    }

    socket.on("canvas-data", (data) => {
      handleCanvasData(data);
    });

    const handleCanvasData = (data) => {
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
          if (object.type === "i-text") {
            console.log("add text");
            const text = new fabric.IText(object.text, {
              left: object.left,
              top: object.top,
              fontFamily: object.fontFamily,
              fill: object.fill,
              fontSize: object.fontSize,
              scaleX: object.scaleX,
              scaleY: object.scaleY,
              angle: object.angle,
              flipX: object.flipX,
              flipY: object.flipY,
              opacity: object.opacity,
            });
            if (fabricCanvas) {
              fabricCanvas.add(text);
            }
          }
        });
      }
    };
    socket.on("get-canvas-data", handleCanvasData);
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
