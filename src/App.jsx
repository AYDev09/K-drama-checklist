import React, { useState, useEffect } from "react";
import Add from "./Add";
import Stats from "./Stats";
import './App.css';

const App = () => {
  const [dramas, setDramas] = useState([]);
  const [page, setPage] = useState("home");

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedDramas = JSON.parse(localStorage.getItem('dramas'));
    if (savedDramas) {
      setDramas(savedDramas);
    }
  }, []);

  // Save dramas to localStorage whenever the 'dramas' state changes
  useEffect(() => {
    if (dramas.length > 0) {
      localStorage.setItem('dramas', JSON.stringify(dramas));
    }
  }, [dramas]);

  const handleAddDrama = (newDrama) => {
    const dramaWithEpisodes = { ...newDrama, episodesWatched: 0 }; // Add episodesWatched to the new drama
    setDramas([...dramas, dramaWithEpisodes]); // Set initial episodesWatched to 0
    setPage("home"); // Switch to home page after adding
  };

  const incrementEpisodes = (index) => {
    const newDramas = [...dramas];
    if (newDramas[index].episodesWatched < newDramas[index].totalEpisodes) {
      newDramas[index].episodesWatched++;
      setDramas(newDramas); // Update dramas state
    }
  };

  const decrementEpisodes = (index) => {
    const newDramas = [...dramas];
    if (newDramas[index].episodesWatched > 0) {
      newDramas[index].episodesWatched--;
      setDramas(newDramas); // Update dramas state
    }
  };

  const handleDeleteDrama = (index) => {
    const newDramas = dramas.filter((_, i) => i !== index);
    setDramas(newDramas); // Remove drama and update state
  };

  return (
    <div>
      <nav>
        <h1>K-Dramalog</h1>
        <div id="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("add")}>Add</button>
          <button onClick={() => setPage("stats")}>Stats</button>
        </div>
      </nav>

      {page === "home" && (
        <div id="home">
          {dramas.length === 0 ? (
            <p id="empty-message">It's empty in here, add some dramas!</p> // Empty message
          ) : (
            <div id="cards-container">
              {dramas.map((drama, index) => (
                <div key={index} id="card">
                  <img src={drama.image} alt={drama.name} />
                  <div id="CardContent">
                    <h2>{drama.name}</h2>
                    <p>Episodes Watched: {drama.episodesWatched} / {drama.totalEpisodes}</p>
                    <div>
                      <button onClick={() => incrementEpisodes(index)}>+</button>
                      <button onClick={() => decrementEpisodes(index)}>-</button>
                      <button onClick={() => handleDeleteDrama(index)}>Delete</button>
                    </div>
                    <button><a href={drama.link} id="watch" target="_blank" rel="noopener noreferrer">Watch Here</a></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {page === "add" && <Add onAddDrama={handleAddDrama} />}
      {page === "stats" && <Stats dramas={dramas} />}
    </div>
  );
};

export default App;
