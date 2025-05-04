import React, { useState } from 'react';
import StickyNote from './StickyNote';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#FDF3C5'); 

  // add new sticky note
  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      color: selectedColor,
      position: { x: 10, y: 10 },
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

var bgColors = { "Default": "#121212",}

  return (
    <div className="app">
      <div className="sticky-note-picker">
        <button onClick={() => setSelectedColor('#FDF3C5')}>yellow</button>
        <button onClick={() => setSelectedColor('#B6E1A1')}>green</button>
        <button onClick={() => setSelectedColor('#F0B7A8')}>pink</button>
        <button onClick={() => setSelectedColor('#b9ddeb')}>blue</button>
        <button onClick={() => setSelectedColor('#d7b9eb')}>purple</button>
        <button onClick={addStickyNote} className="add-note-btn" style={{backgroundColor: bgColors.Default}}> add note </button>
      </div>

      

      <div className="board">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            color={note.color}
            initialPosition={note.position}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
