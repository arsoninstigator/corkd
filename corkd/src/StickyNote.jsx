import React, { useState, useRef } from 'react';

const StickyNote = ({ color, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={noteRef}
      className="sticky-note"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: color,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="sticky-note-body">
        <textarea placeholder="Write here..."></textarea>
      </div>
    </div>
  );
};

export default StickyNote;
