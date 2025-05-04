import { useState } from 'react';
import Draggable from 'react-draggable';

export default function FloatingText({ tool }) {
  const [texts, setTexts] = useState([]);

  const handleClick = (e) => {
    if (tool !== 'text') return;
    const { clientX, clientY } = e;
    setTexts([...texts, {
      id: Date.now(),
      text: 'Double-click to edit',
      position: { x: clientX, y: clientY },
    }]);
  };

  const updateText = (id, newText) => {
    setTexts(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full" onClick={handleClick}>
      {texts.map(t => (
        <Draggable key={t.id} defaultPosition={t.position}>
          <div className="absolute bg-white bg-opacity-80 p-2 rounded shadow text-sm font-sans" contentEditable suppressContentEditableWarning
               onDoubleClick={() => null}
               onBlur={e => updateText(t.id, e.target.innerText)}>
            {t.text}
          </div>
        </Draggable>
      ))}
    </div>
  );
}
