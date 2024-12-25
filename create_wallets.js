const { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } = require('@solana/web3.js');

// Connect to the Solana devnet
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Function to create a new wallet
function createWallet() {
    const keypair = Keypair.generate();
    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: keypair.secretKey.toString('base64')
    };
}

// Function to check the balance of a wallet
async function checkBalance(publicKey) {
    console.log(`Checking balance for: ${publicKey}`);
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return (balance / LAMPORTS_PER_SOL).toFixed(9);
}

// Create multiple wallets
const wallets = [];
for (let i = 0; i < 5; i++) { // Change 5 to the number of wallets you want to create
    const wallet = createWallet();
    wallets.push(wallet);
    console.log(`Wallet ${i + 1}:`);
    console.log(`Public Key: ${wallet.publicKey}`);
    console.log(`Secret Key: ${wallet.secretKey}`);
}

// Main wallet public key
const mainWalletPublicKey = 'HrDE3tUnVTQ9oU1g9DP4RN2skmTfdMfokzWmkFc8h7yp';

// Check the balance of the main wallet
checkBalance(mainWalletPublicKey).then(balance => {
    console.log(`Main Wallet Balance: ${balance} SOL`);
});

// Check the balance of the target wallet
const targetWalletPublicKey = 'H7guoWLmnFQdLKsR6sUf3pDYiQcBwrvydcfK7HiAPTLY';
checkBalance(targetWalletPublicKey).then(balance => {
    console.log(`Target Wallet Balance: ${balance} SOL`);
});

// Check the balance of each wallet
wallets.forEach(async (wallet, index) => {
    const balance = await checkBalance(wallet.publicKey);
    console.log(`Wallet ${index + 1} Balance: ${balance} SOL`);
});