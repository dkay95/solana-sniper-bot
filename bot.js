const WebSocket = require('ws');
const bs58 = require('bs58');
const { VersionedTransaction, Connection, Keypair } = require('@solana/web3.js');

// Use a paid RPC endpoint here for best performance
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com/";
const web3Connection = new Connection(
    RPC_ENDPOINT,
    'confirmed',
 );
const ws = new WebSocket("wss://pumpportal.fun/api/data");

ws.on("open", function open() {
  // Subscribing to token creation events
  let payload = {
    method: "subscribeNewToken",
  };
  ws.send(JSON.stringify(payload));
});

ws.on("message", function message(data) {
  console.log(JSON.parse(data));
  const tokenCreationData = JSON.parse(data);
  if (tokenCreationData.mint) {
    console.log("Buying: " + tokenCreationData.mint);
    sendPumpTransaction("buy", tokenCreationData.mint, 0.01).then(() => {
      // sell after 20000 milliseconds
      setTimeout(() => {
        console.log("Selling: " + tokenCreationData.mint);
        sendPumpTransaction("sell", tokenCreationData.mint, "100%");
      }, 20000);
    });
  }
});

async function sendPumpTransaction(action, mint, amount){
    const signerKeyPair = Keypair.fromSecretKey(bs58.decode("5bkjKAa3Y7tmqAQmHx6EDk2XHtmBPX29vRLrRuqqpvEywZxfFSUR3MCE2SoL2HHRxQgK6hqUVq4hjf5UcsxoDSH4"));
    const signerPublicKey = signerKeyPair.publicKey.toBase58();
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            publicKey: signerPublicKey,
            "action": action, // "buy" or "sell"
            "mint": mint, // contract address of the token you want to trade
            "denominatedInSol": "true",  // "true" if amount is amount of SOL, "false" if amount is number of tokens
            "amount": amount, // amount of SOL or tokens
            "slippage": 15, // percent slippage allowed
            "priorityFee": 0.0001, //priority fee
            "pool": "pump"
        })
    });
    if(response.status === 200){ // successfully generated transaction
        const data = await response.arrayBuffer();
        const tx = VersionedTransaction.deserialize(new Uint8Array(data));
        tx.sign([signerKeyPair]);
        let signature;
        try{
            signature = await web3Connection.sendTransaction(tx, {preflightCommitment: "processed"})
        } catch(e){
            console.error(e.message);
        }
        console.log("Transaction: https://solscan.io/tx/" + signature);
    } else {
        console.log(response.statusText); // log error
    }
}