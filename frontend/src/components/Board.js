import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles/Board.scss";

const Board = ({action}) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState();
  

  useEffect(
    () => {
      console.log("action," , action);
      if (canvasRef.current) {
        const parentWidth = canvasRef.current.parentElement.clientWidth;
        const height = canvasRef.current.parentElement.clientHeight;
        const canvas = new fabric.Canvas(canvasRef.current, {
          height: height,
          width: parentWidth,
          isDrawingMode: action === "drawing",
        });
        setFabricCanvas(canvas);

        //when an something is drawn on the page then handle the path.
        canvas.on("path:created", (e) => {
          const json = canvas.toJSON();
          console.log(json);
        });
      }
    },
    [canvasRef,action]
  );

  return (
    <div className="container">
      
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Board;
