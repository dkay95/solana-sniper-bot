import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'fs';

// Connect to the Solana mainnet
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Main wallet details
const mainWalletSecretKey = bs58.decode('5bkjKAa3Y7tmqAQmHx6EDk2XHtmBPX29vRLrRuqqpvEywZxfFSUR3MCE2SoL2HHRxQgK6hqUVq4hjf5UcsxoDSH4');
const mainWallet = Keypair.fromSecretKey(mainWalletSecretKey);

// Created wallets (public and secret keys)
const createdWallets = [
    { publicKey: 'CNafMmvYtM634azJL8JkcsVNCGjecSxZHuWLsrhHbD4a', secretKey: '20,33,208,129,122,45,139,160,91,108,30,117,191,123,66,60,16,209,50,73,66,95,69,57,183,240,179,140,113,220,31,223,168,247,208,110,158,202,68,39,18,59,117,40,241,2,233,76,69,244,39,78,199,208,7,155,138,130,7,158,65,75,94,15' },
    { publicKey: '99X3a6Yi4eYR7fTdixM4NmHkRbW3L5CgnEdam3sgp9X3', secretKey: '78,120,99,239,118,152,234,50,44,51,167,143,168,159,14,7,229,137,57,96,27,95,5,198,239,137,109,196,135,145,129,119,121,12,28,244,121,207,121,61,148,71,215,89,67,216,12,76,155,53,182,202,146,218,167,164,140,188,144,140,241,119,227,118' },
    { publicKey: '9uNFkU3k5HY5h6zUbdQnB9of96k3pBcpuDc4RBUwg5UZ', secretKey: '42,207,72,254,6,117,70,233,12,37,145,44,147,133,242,106,164,201,7,74,199,14,216,130,222,133,229,83,148,108,166,214,132,71,186,211,245,87,206,112,200,60,93,115,169,111,199,30,90,30,200,231,156,58,39,5,187,193,106,146,56,250,43,166' },
    { publicKey: 'FeAVzvLnhDdjJt6K9ACzvzotntEoawGPWD9NiHjFo8KS', secretKey: '131,99,250,158,50,210,149,164,71,2,61,112,79,250,48,83,66,111,210,254,170,52,121,253,47,97,188,74,185,102,198,243,217,136,217,59,91,58,128,171,7,77,5,88,148,199,38,27,86,205,122,249,140,154,112,218,158,206,167,247,97,77,69,249' },
    { publicKey: 'RsYFQTbHX9Nz4exqAtWYajtSQFjWFHDcp1b9J3kxdbT', secretKey: '206,66,243,160,98,236,184,196,239,252,86,19,128,87,68,195,30,56,95,135,119,192,24,19,27,225,215,161,22,123,201,60,6,95,21,114,175,195,196,29,38,85,84,161,12,230,182,52,129,106,214,105,126,254,135,233,227,47,242,23,72,50,176,166' }
];

async function transferAndBackup() {
    // Backup wallet details
    fs.writeFileSync('wallet_backup.json', JSON.stringify(createdWallets, null, 2));
    console.log('Wallet details backed up to wallet_backup.json');

    for (const wallet of createdWallets) {
        const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(wallet.secretKey.split(',').map(Number)));
        const balance = await connection.getBalance(walletKeypair.publicKey);

        if (balance > 0) {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: walletKeypair.publicKey,
                    toPubkey: mainWallet.publicKey,
                    lamports: balance - (0.0005 * LAMPORTS_PER_SOL), // Leave some lamports for fees
                })
            );

            try {
                const signature = await connection.sendTransaction(transaction, [walletKeypair]);
                console.log(`Transferred from ${wallet.publicKey} with signature: ${signature}`);
            } catch (error) {
                console.error(`Failed to transfer from ${wallet.publicKey}:`, error);
            }
        }
    }
}

transferAndBackup();