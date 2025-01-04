import React, { useState } from 'react';

function Add({ onAddDrama }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  // Convert uploaded file to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set the Base64 image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDrama = { name, image, link };
    onAddDrama(newDrama);
    setName('');
    setImage(null);
    setLink('');
  };

  return (
    <form id="add-form" onSubmit={handleSubmit}>
      <h2>Add a New Drama</h2>

      <input
        type="text"
        placeholder="Drama Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        placeholder='drama image'
        required
      />

      <input
        type="text"
        placeholder="Drama Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button type="submit">Add Drama</button>
    </form>
  );
}

export default Add;
