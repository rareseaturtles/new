let walletAddress = null;

async function connectWallet() {
  const provider = window.solana;

  if (provider && provider.isPhantom) {
    try {
      const response = await provider.connect();
      walletAddress = response.publicKey.toString();
      document.getElementById('wallet-address').innerText = walletAddress;
      checkEligibility(walletAddress);
      document.getElementById('wallet-info').classList.remove('hidden');
      document.getElementById('connect-wallet-btn').classList.add('hidden');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  } else {
    alert("Please install Phantom Wallet!");
  }
}

async function checkEligibility(walletAddress) {
  // Example: Fetch DIRA balance from Solscan (replace with actual API later)
  const solscanUrl = `https://api.solscan.io/account/tokens?account=${walletAddress}`;
  
  try {
    const response = await fetch(solscanUrl);
    const data = await response.json();
    const diraToken = data.find(token => token.tokenAddress === "53hZ5wdfphd8wUoh6rqrv5STvB58yBRaXuZFAWwitKm8"); // DIRA Token Address
    const diraBalance = diraToken ? diraToken.amount : 0;

    document.getElementById('dira-balance').innerText = diraBalance;

    if (diraBalance >= 10000) {
      document.getElementById('eligibility-message').innerText = "You are eligible for the 1,000 DIRA airdrop!";
      document.getElementById('claim-btn').classList.remove('hidden');
    } else {
      document.getElementById('eligibility-message').innerText = "You need 10,000 DIRA to qualify.";
    }
  } catch (error) {
    console.error('Error fetching token balance:', error);
  }
}

function claimAirdrop() {
  if (walletAddress) {
    alert("Airdrop claimed successfully! 1,000 DIRA sent.");
    // Implement real airdrop functionality here with Solana Web3.js (future step).
  } else {
    alert("Please connect your wallet first.");
  }
}
