// components/ProfileManagement.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProfileManagement = () => {
  const { user } = useContext(AuthContext);
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/teams/${user.teamId}`, { name: teamName, logo: teamLogo });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Team Logo URL</label>
          <input
            type="text"
            value={teamLogo}
            onChange={(e) => setTeamLogo(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;