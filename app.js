// app.js (Backend)
const io = require('socket.io')(server);

let auctionStatus = 'paused'; // Default auction status
let currentPlayer = null; // Current player up for auction
let currentBid = null; // Current highest bid

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast auction status
  socket.emit('auctionStatus', { status: auctionStatus, player: currentPlayer, bid: currentBid });

  // Start auction
  socket.on('startAuction', async (playerId) => {
    const player = await Player.findById(playerId);
    if (!player) return;

    auctionStatus = 'started';
    currentPlayer = player;
    currentBid = { amount: player.basePrice, team: null };

    io.emit('auctionStarted', { status: auctionStatus, player: currentPlayer, bid: currentBid });
  });

  // Pause auction
  socket.on('pauseAuction', () => {
    auctionStatus = 'paused';
    io.emit('auctionPaused', { status: auctionStatus });
  });

  // Place bid
  socket.on('placeBid', async ({ teamId, amount }) => {
    if (auctionStatus !== 'started') return;

    const team = await Team.findById(teamId);
    if (!team || team.budget < amount) return;

    currentBid = { amount, team: team._id };
    io.emit('updateBid', { player: currentPlayer, bid: currentBid });
  });

  // Finalize bid
  socket.on('finalizeBid', async () => {
    if (!currentPlayer || !currentBid.team) return;

    const team = await Team.findById(currentBid.team);
    team.players.push(currentPlayer._id);
    team.budget -= currentBid.amount;
    await team.save();

    currentPlayer.soldTo = team._id;
    await currentPlayer.save();

    auctionStatus = 'paused';
    io.emit('bidFinalized', { player: currentPlayer, team, bid: currentBid });

    currentPlayer = null;
    currentBid = null;
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});