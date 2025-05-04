import { useState } from 'react';
import Draggable from 'react-draggable';

export default function ImageUploader() {
  const [images, setImages] = useState([]);

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, { id: Date.now(), src: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        className="absolute top-4 right-4 z-50"
        onChange={handleImageUpload}
      />
      {images.map(img => (
        <Draggable key={img.id}>
          <img src={img.src} alt="Uploaded" className="absolute w-32 rounded shadow-md" />
        </Draggable>
      ))}
    </>
  );
}
