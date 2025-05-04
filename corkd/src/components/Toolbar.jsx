import React from 'react';

export default function Toolbar({ onAddNote, onUploadImage }) {
  const colors = ['bg-pastelPink', 'bg-pastelGreen', 'bg-pastelBlue', 'bg-pastelPurple', 'bg-pastelYellow'];

  return (
    <div className="absolute top-4 left-4 flex gap-2 z-50">
      {colors.map((color, idx) => (
        <button
          key={idx}
          className={`${color} px-3 py-2 rounded shadow`}
          onClick={() => onAddNote(color)}
        >
          Add Note
        </button>
      ))}
      <label className="bg-white px-3 py-2 rounded shadow cursor-pointer">
        Upload Image
        <input type="file" accept="image/*" className="hidden" onChange={onUploadImage} />
      </label>
    </div>
  );
}
