import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [myTeam, setMyTeam] = useState([1, 2, 3]);
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    fetch('https://fantasy-nfl-app.vercel.app/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    myTeam.forEach(playerId => {
      fetch(`https://fantasy-nfl-app.vercel.app/api/player/${playerId}/stats`)
        .then(res => res.json())
        .then(data => {
          setPlayerStats(prev => ({...prev, [playerId]: data}));
        })
        .catch(err => console.log(err));
    });
  }, [myTeam]);

  const totalPoints = myTeam.reduce((total, playerId) => {
    return total + (playerStats[playerId]?.stats?.points || 0);
  }, 0);

  return (
    <div style={{padding: '20px', fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto'}}>
      <h1 style={{color: '#1e40af'}}>🏈 Fantasy NFL</h1>
      
      <div style={{background: 'linear-gradient(45deg, #1e40af, #7c3aed)', color: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
        <h2>My Team</h2>
        <div style={{fontSize: '32px', fontWeigh
