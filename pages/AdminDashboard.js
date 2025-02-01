// pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    age: '',
    role: '',
    basePrice: '',
  });

  // Fetch teams and players on page load
  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('/api/teams');
      setTeams(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await axios.get('/api/players');
      setPlayers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/players', newPlayer);
      fetchPlayers(); // Refresh player list
      setNewPlayer({ name: '', age: '', role: '', basePrice: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <button onClick={handleLogout} className="btn btn-danger mb-3">
        Logout
      </button>

      {/* Add Player Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Player</h5>
          <form onSubmit={handleAddPlayer}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Age"
                value={newPlayer.age}
                onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <select
                value={newPlayer.role}
                onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                className="form-select"
              >
                <option value="">Select Role</option>
                <option value="Bowler">Bowler</option>
                <option value="Batsman">Batsman</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicketkeeper">Wicketkeeper</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Base Price"
                value={newPlayer.basePrice}
                onChange={(e) => setNewPlayer({ ...newPlayer, basePrice: e.target.value })}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Player
            </button>
          </form>
        </div>
      </div>

      {/* Teams List */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Teams</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Budget</th>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>${team.budget}</td>
                  <td>{team.players.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Players List */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Players</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Role</th>
                <th>Base Price</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player._id}>
                  <td>{player.name}</td>
                  <td>{player.age}</td>
                  <td>{player.role}</td>
                  <td>${player.basePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;