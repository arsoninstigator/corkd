import React, { useState, useRef } from 'react';
import pinImg from './assets/pin.png'; 

const StickyNote = ({ id, color, initialPosition, onDelete }) => {
  const [position, setPosition] = useState(initialPosition);
  const [title, setTitle] = useState('Note Title');
  const [body, setBody] = useState('');
  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
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
      <img src={pinImg} alt="pin" className="pin-graphic" />
      <button className="delete-btn" onClick={() => onDelete(id)}>✕</button>
      <input
        className="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="note-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write here..."
      />
    </div>
  );
};

export default StickyNote;
