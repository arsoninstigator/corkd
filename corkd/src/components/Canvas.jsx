import React, { useRef, useState } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState([]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = [e.clientX - rect.left, e.clientY - rect.top];
    setDrawing(true);
    setPaths((prev) => [...prev, [point]]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = [e.clientX - rect.left, e.clientY - rect.top];
    setPaths((prev) => {
      const newPaths = [...prev];
      newPaths[newPaths.length - 1].push(point);
      return newPaths;
    });
  };

  const handleMouseUp = () => setDrawing(false);

  const clearCanvas = () => setPaths([]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0 z-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button
        onClick={clearCanvas}
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded shadow z-50"
      >
        Clear Drawing
      </button>
    </>
  );
}
