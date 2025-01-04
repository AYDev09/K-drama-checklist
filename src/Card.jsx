import React from 'react';

const Card = ({ name, image, epw, link }) => {
  return (
    <div id="card">
      <img src={image} alt={name} />
      <div id="CardContent">
        <h2>Name: {name}</h2>
        <h2>Episodes Watched: {epw}</h2>
        <button id="cardButton"> 
            <a href={link} target="_blank" rel="noopener noreferrer">
                Watch Here
            </a>
        </button>
      </div>   
    </div>
  );
};

export default Card;
