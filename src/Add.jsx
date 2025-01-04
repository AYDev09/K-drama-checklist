import React, { useState } from 'react';

function Add({ onAddDrama }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(''); // Total Episodes state
  const [episodesWatched, setEpisodesWatched] = useState(null); // Episodes Watched state
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
    const newDrama = {
      name,
      image,
      totalEpisodes,
      episodesWatched,
      link,
    };
    onAddDrama(newDrama);
    setName('');
    setImage(null);
    setTotalEpisodes('');
    setEpisodesWatched(0); // Reset the state after adding
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
        placeholder='Drama Image'
        required
      />

      <input
        type="number"
        value={totalEpisodes}
        onChange={(e) => setTotalEpisodes(e.target.value)}
        placeholder="Total Episodes"
        required
      />

      <input
        type="number"
        value={episodesWatched}
        onChange={(e) => setEpisodesWatched(e.target.value)}
        placeholder="Episodes Watched"
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
