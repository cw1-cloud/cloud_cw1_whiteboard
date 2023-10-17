import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./Board.scss";

const Board = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "lightblue",
      width: 1290,
      height: 1000,
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);
  }, [canvasRef]);

  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Board;
