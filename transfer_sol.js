import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import bs58 from 'bs58';

// Connect to the Solana mainnet
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Main wallet details
const mainWalletSecretKey = bs58.decode('5bkjKAa3Y7tmqAQmHx6EDk2XHtmBPX29vRLrRuqqpvEywZxfFSUR3MCE2SoL2HHRxQgK6hqUVq4hjf5UcsxoDSH4');
const mainWallet = Keypair.fromSecretKey(mainWalletSecretKey);

// Target wallet public key
const targetWalletSecretKey = bs58.decode('your-target-wallet-secret-key');
const targetWallet = Keypair.fromSecretKey(targetWalletSecretKey);

async function transferSol() {
    // Check main wallet balance
    const mainWalletBalance = await connection.getBalance(mainWallet.publicKey);
    console.log(`Main Wallet Balance: ${(mainWalletBalance / LAMPORTS_PER_SOL).toFixed(9)} SOL`);

    // Calculate transfer amount (leave 0.001 SOL for fees)
    const transferAmount = mainWalletBalance - (0.001 * LAMPORTS_PER_SOL);

    if (transferAmount <= 0) {
        console.log('Insufficient balance to cover transfer and fees.');
        return;
    }

    // Create transaction
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: mainWallet.publicKey,
            toPubkey: targetWalletPublicKey,
            lamports: transferAmount,
        })
    );

    // Sign and send transaction
    try {
        const signature = await connection.sendTransaction(transaction, [mainWallet]);
        console.log(`Transaction successful with signature: ${signature}`);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

transferSol();