// components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/teams/leaderboard');
        setTeams(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Total Spending</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team._id}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>${1000000 - team.budget}</td>
              <td>{team.players.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;