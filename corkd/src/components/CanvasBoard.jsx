import React, { useState } from 'react';
import StickyNote from './StickyNote';

export default function CanvasBoard({ tool }) {
  const [notes, setNotes] = useState([]);
  const [shapes, setShapes] = useState([]);

  const handleBoardClick = (e) => {
    const { clientX, clientY } = e;
    if (tool === 'note') {
      const colorOptions = ['#fac6c7', '#a8d18d', '#b8dfff', '#e3c9f6', '#fff3b0'];
      const newNote = {
        id: Date.now(),
        heading: '',
        text: '',
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        position: { x: clientX, y: clientY },
      };
      setNotes([...notes, newNote]);
    } else if (tool === 'clear') {
      setNotes([]);
      setShapes([]);
    }
  };

  const updateNote = (updatedNote) => {
    setNotes(prev => prev.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  return (
    <div className="w-full h-full absolute top-0 left-0" onClick={handleBoardClick}>
      {notes.map(note => (
        <StickyNote key={note.id} note={note} onChange={updateNote} />
      ))}
    </div>
  );
}
