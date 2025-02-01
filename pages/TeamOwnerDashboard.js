// pages/TeamOwnerDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TeamOwnerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);

  // Fetch team details on page load
  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`/api/teams/${user.teamId}`);
      setTeam(res.data);
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
      <h2 className="mb-4">Team Owner Dashboard</h2>
      <button onClick={handleLogout} className="btn btn-danger mb-3">
        Logout
      </button>

      {team ? (
        <>
          {/* Team Details */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{team.name}</h5>
              <p className="card-text">Remaining Budget: ${team.budget}</p>
            </div>
          </div>

          {/* Purchased Players */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Purchased Players</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((player) => (
                    <tr key={player._id}>
                      <td>{player.name}</td>
                      <td>{player.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TeamOwnerDashboard;