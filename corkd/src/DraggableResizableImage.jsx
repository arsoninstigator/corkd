import React, { useState, useRef } from 'react';

const DraggableResizableImage = ({ id, src, position, onUpdate }) => {
  const [pos, setPos] = useState(position);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const imageRef = useRef(null);

  const onDrag = (e) => {
    const img = imageRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;
      img.style.transform = `translate(${newX}px, ${newY}px)`;
      setPos({ x: newX, y: newY });
      onUpdate(id, { position: { x: newX, y: newY } });
    };

    const stopDragging = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
  };

  const onResize = (e) => {
    e.stopPropagation();
    const startWidth = size.width;
    const startHeight = size.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleResizeMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const newWidth = Math.max(50, startWidth + deltaX);
      const newHeight = Math.max(50, startHeight + deltaY);
      setSize({ width: newWidth, height: newHeight });
    };

    const stopResizing = () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', stopResizing);
  };

  return (
    <div
      ref={imageRef}
      className="draggable-image"
      onMouseDown={onDrag}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
    >
      <img src={src} alt="" draggable={false} />
      <div className="resize-handle" onMouseDown={onResize} />
    </div>
  );
};

export default DraggableResizableImage;
