import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";

const Board = ({ action }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();
  // This contains all the drawings
  const [drawingsJSON, setDrawingJSON] = useState({});
  // This is the latest thing that's drawn on the page
  const [latestPath, setLatestPath] = useState(null);
  const [textObject, setTextObject] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight;
      const canvas = new fabric.Canvas(canvasRef.current, {
        height: height,
        width: parentWidth,
        isDrawingMode: action === "drawing",
      });


      canvas.on("path:created", (path) => {
        setLatestPath(path);
        const json = canvas.toJSON();
        setDrawingJSON(json);
      });

      canvas.on("object:selected", (e) => {
        if (e.target.type === "i-text") {
          canvas.isDrawingMode = false;
        }
      });

      if (action === "text") {
        canvas.isDrawingMode = false;
        if (!textObject) {
          const text = new fabric.IText("Enter text here", {
            left: 50,
            top: 50,
          });
          setTextObject(text);
        }
        if (textObject) {
          canvas.add(textObject);
        }
      } else {
        canvas.loadFromJSON(drawingsJSON, canvas.renderAll.bind(canvas));
      }

      setFabricCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    }
  }, [action, canvasRef, drawingsJSON, textObject]);

  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default Board;
