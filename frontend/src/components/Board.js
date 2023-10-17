import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";

const Board = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();

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

  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Board;
