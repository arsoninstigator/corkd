import { useRef, useEffect, useState } from 'react';

const DrawingCanvas = ({ mode }) => {
  const canvasRef = useRef(null);
  const [start, setStart] = useState(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(s => drawShape(ctx, s));
  }, [shapes]);

  const drawShape = (ctx, shape) => {
    const { x1, y1, x2, y2, type } = shape;
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    if (type === 'rect') ctx.rect(x1, y1, x2 - x1, y2 - y1);
    if (type === 'line') ctx.moveTo(x1, y1), ctx.lineTo(x2, y2);
    if (type === 'circle') {
      const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    }
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    if (!mode) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = (e) => {
    if (!mode || !start) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const end = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setShapes([...shapes, { x1: start.x, y1: start.y, x2: end.x, y2: end.y, type: mode }]);
    setStart(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="absolute top-0 left-0 z-0 pointer-events-auto"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

export default DrawingCanvas;
