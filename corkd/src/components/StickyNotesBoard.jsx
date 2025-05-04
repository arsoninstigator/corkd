import React, { useState } from 'react';

function StickyNotesBoard() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [notePosition, setNotePosition] = useState({ x: 100, y: 100 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnLines, setDrawnLines] = useState([]);

  const addNote = () => {
    setNotes([...notes, { text: currentNote, position: notePosition }]);
    setCurrentNote("");
  };

  const handleDragStart = (e, noteId) => {
    e.dataTransfer.setData("noteId", noteId);
  };

  const handleDrop = (e) => {
    const noteId = e.dataTransfer.getData("noteId");
    const newPosition = { x: e.clientX, y: e.clientY };
    const updatedNotes = notes.map((note, index) => {
      if (index === parseInt(noteId)) {
        return { ...note, position: newPosition };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleDrawStart = () => {
    setIsDrawing(true);
  };

  const handleDrawEnd = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      setDrawnLines([...drawnLines, { x: e.clientX, y: e.clientY }]);
    }
  };

  return (
    <div
      className="w-full h-screen bg-beige relative"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseMove={handleMouseMove}
    >
      <div className="sticky-notes-container absolute">
        <div className="flex space-x-4 p-4">
          <input
            type="text"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Note</button>
        </div>
        {notes.map((note, index) => (
          <div
            key={index}
            className="sticky-note"
            style={{ left: note.position.x, top: note.position.y }}
            draggable
            onDragStart={(e) => handleDragStart(e, index.toString())}
          >
            <div className="bg-yellow-300 p-3 rounded-md shadow-lg w-48">
              <h4 className="font-bold text-lg">Sticky Note {index + 1}</h4>
              <p>{note.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="drawing-tools absolute bottom-10 left-10">
        <button onClick={handleDrawStart} className="bg-green-500 text-white px-4 py-2 rounded-md">Start Drawing</button>
        <button onClick={handleDrawEnd} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Stop Drawing</button>
      </div>

      <div className="drawn-lines absolute">
        {drawnLines.map((line, index) => (
          <div key={index} className="absolute" style={{ left: line.x, top: line.y }}>
            <div className="bg-red-500 w-2 h-2 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyNotesBoard;
