import React from 'react';
import './App.css';
import Card from './Card';
import qot from './assets/qot.jpg';

function App() {
  return (
    <div id="home">
      <nav>
        <h1>K-Drama Checklist</h1>
      </nav>
      <Card
        name="Queen Of Tears"
        image={qot}
        epw="20/26"
        link="https://google.com"
      />
    </div>
  );
}

export default App;
