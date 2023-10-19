import React, { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";

const Board = ({ action }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();
  // This contains all the drawings
  const [drawingsJSON, setDrawingJSON] = useState({});
  // This is the latest thing that's drawn on the page
  const [latestPath, setLatestPath] = useState(null);

  const [mode, setMode] = useState(action);

  useEffect(() => {
    if (canvasRef.current) {
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight;
      const canvas = new fabric.Canvas(canvasRef.current, {
        height: height,
        width: parentWidth,
        isDrawingMode: true,
      });
      setFabricCanvas(canvas);
    }
  }, [canvasRef]);

  useEffect(() => {
    setMode(action);

    switch (mode) {
      case "drawing":
        console.log("the currentMode is ", mode);
        fabricCanvas.isDrawingMode = true;
        console.log(fabricCanvas.isDrawingMode);
        break;
      case "text":
        console.log("the currentMode is ", mode);
        fabricCanvas.isDrawingMode = false;
        console.log(fabricCanvas.isDrawingMode);
        break;

      default:
        break;
    }
  }, [action, fabricCanvas, mode]);

  useEffect(() => {
    if (fabricCanvas) {
      //when an something is drawn on the page then handle the path.
      fabricCanvas.on("path:created", (path) => {
        console.log("path", path);
        setLatestPath(path);
        const json = fabricCanvas.toJSON();
        setDrawingJSON("allDrawings", json);
        console.log(json);
      });
      fabricCanvas.renderAll.bind(fabricCanvas);

      // if (canvasRef.current && action === "text") {
      //   console.log("text mode is about to be set");
      //   const text = new fabric.IText("Enter text here", {
      //     left: 100,
      //     top: 100,
      //     fontFamily: "Arial",
      //     fontSize: 20,
      //     selected: true,
      //     editable: true,
      //   });

      //   canvas.add(text);
      //   canvas.renderAll.bind(canvas);
      // }
    }
  }, [action, fabricCanvas]);

  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default Board;
