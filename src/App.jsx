import React, { useState, useEffect } from 'react';
import Add from './Add';
import './App.css';

function App() {
  const [dramas, setDramas] = useState(() => {
    const savedDramas = localStorage.getItem('dramas');
    return savedDramas ? JSON.parse(savedDramas) : [];
  });

  const [page, setPage] = useState('home'); // Page state to switch between Home and Add

  useEffect(() => {
    localStorage.setItem('dramas', JSON.stringify(dramas));
  }, [dramas]);

  // Add new drama
  const handleAddDrama = (newDrama) => {
    setDramas([...dramas, { ...newDrama, episodesWatched: 0 }]);
  };

  // Increment episodes watched
  const incrementEpisodes = (index) => {
    const updatedDramas = [...dramas];
    updatedDramas[index].episodesWatched += 1;
    setDramas(updatedDramas);
  };

  // Decrement episodes watched
  const decrementEpisodes = (index) => {
    const updatedDramas = [...dramas];
    if (updatedDramas[index].episodesWatched > 0) {
      updatedDramas[index].episodesWatched -= 1;
      setDramas(updatedDramas);
    }
  };

  // Delete drama
  const deleteDrama = (index) => {
    const updatedDramas = dramas.filter((_, i) => i !== index);
    setDramas(updatedDramas);
  };

  return (
    <div id="home">
      <nav>
        <h1>K Drama Checklist and Tracker</h1>
        <div id="nav-links">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('add')}>Add</button>
        </div>
      </nav>

      {page === 'home' && (
        <div id="cards-container">
          {dramas.map((drama, index) => (
            <div key={index} id="card">
              {drama.image && (
                <img src={drama.image} alt={drama.name} />
              )}
              <div id="CardContent">
                <h2>{drama.name}</h2>
                <p>Episodes Watched: {drama.episodesWatched}</p>
                <div>
                  <button onClick={() => incrementEpisodes(index)}>➕</button>
                  <button onClick={() => decrementEpisodes(index)}>➖</button>
                  <button onClick={() => deleteDrama(index)}>🗑️ Delete</button>
                </div>
                <button><a href={drama.link} id="watch">Watch Here</a></button>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {page === 'add' && <Add onAddDrama={handleAddDrama} />}
    </div>
  );
}

export default App;
