// components/LiveAuction.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const LiveAuction = () => {
  const [auctionStatus, setAuctionStatus] = useState('paused');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);

  useEffect(() => {
    // Listen for auction updates
    socket.on('auctionStatus', ({ status, player, bid }) => {
      setAuctionStatus(status);
      setCurrentPlayer(player);
      setCurrentBid(bid);
    });

    socket.on('updateBid', ({ player, bid }) => {
      setCurrentPlayer(player);
      setCurrentBid(bid);
    });

    socket.on('bidFinalized', ({ player, team, bid }) => {
      setCurrentPlayer(null);
      setCurrentBid(null);
      alert(`${player.name} sold to ${team.name} for $${bid.amount}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlaceBid = () => {
    const bidAmount = parseInt(prompt('Enter your bid amount:'), 10);
    if (!isNaN(bidAmount)) {
      socket.emit('placeBid', { teamId: 'your-team-id', amount: bidAmount }); // Replace with actual team ID
    }
  };

  return (
    <div className="container mt-4">
      <h2>Live Auction</h2>
      {auctionStatus === 'started' && currentPlayer ? (
        <div>
          <h3>Player: {currentPlayer.name}</h3>
          <p>Role: {currentPlayer.role}</p>
          <p>Base Price: ${currentPlayer.basePrice}</p>
          <p>Current Bid: ${currentBid?.amount || 'None'}</p>
          <button onClick={handlePlaceBid} className="btn btn-primary">
            Place Bid
          </button>
        </div>
      ) : (
        <p>Auction is paused.</p>
      )}
    </div>
  );
};

export default LiveAuction;