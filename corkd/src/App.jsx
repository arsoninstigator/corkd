import React, { useState } from 'react';
import StickyNote from './StickyNote';
import DraggableResizableImage from './DraggableResizableImage';
import './App.css';

const bgColors = {
  Default: '#121212',
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#FDF3C5');

  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      color: selectedColor,
      position: { x: 50, y: 50 },
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newImage = {
      id: Date.now(),
      src: imageUrl,
      position: { x: 100, y: 100 },
    };
    setImages((prev) => [...prev, newImage]);
    e.target.value = ''; 
  };

  const updateImage = (id, newProps) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...newProps } : img))
    );
  };

  return (
    <div className="app">
  <div className="sticky-note-picker">
  <div className="color-circles">
    <div className="color-circle" style={{ backgroundColor: '#FDF3C5' }} onClick={() => setSelectedColor('#FDF3C5')} />
    <div className="color-circle" style={{ backgroundColor: '#B6E1A1' }} onClick={() => setSelectedColor('#B6E1A1')} />
    <div className="color-circle" style={{ backgroundColor: '#F0B7A8' }} onClick={() => setSelectedColor('#F0B7A8')} />
    <div className="color-circle" style={{ backgroundColor: '#b9ddeb' }} onClick={() => setSelectedColor('#b9ddeb')} />
    <div className="color-circle" style={{ backgroundColor: '#d7b9eb' }} onClick={() => setSelectedColor('#d7b9eb')} />
  </div>
  <button onClick={addStickyNote} className="add-note-btn" style={{ backgroundColor: bgColors.Default }}>
    add note
  </button>
  <label className="upload-label">
    upload image
    <input type="file" accept="image/*" onChange={addImage} />
  </label>
</div>


      <div className="board">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            color={note.color}
            initialPosition={note.position}
            onDelete={deleteNote}
          />
        ))}
        {images.map((img) => (
          <DraggableResizableImage
            key={img.id}
            id={img.id}
            src={img.src}
            position={img.position}
            onUpdate={updateImage}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
