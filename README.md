# Solana Trading Bot

This project is a Solana trading bot that connects to the Pump.fun API to automate buying and selling of tokens using multiple wallets. The bot is designed to simulate organic trading behavior by introducing random delays in trading actions.

## Features

- **Fund Child Wallets:** Transfer SOL from the main wallet to child wallets to prepare them for trading.
- **Automated Trading:** Use child wallets to buy and sell specified tokens when trading is active.
- **Manual Control:** Start and stop trading manually using provided functions.
- **Simulated Organic Trading:** Introduce random delays in trading actions to mimic organic behavior.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Electron GUI:**
   ```bash
   npx electron .
   ```

3. **Run the Trading Bot:**
   ```bash
   node trading_bot.js
   ```

## Usage

- **Fund Child Wallets:**
  - Call `fundChildWallets()` to transfer SOL to child wallets.

- **Start Trading:**
  - Call `startTrading()` to begin buying the specified token.

- **Stop Trading:**
  - Call `stopTrading()` to stop buying, start selling, and transfer assets back to the main wallet.

## Configuration

- **Main Wallet:**
  - The main wallet's secret key is hardcoded in the script for simplicity.

- **Child Wallets:**
  - The child wallets are pre-configured with public and secret keys.

- **Token to Trade:**
  - The token to trade is specified in the script (`3FMCAkk5yFz8U9u7j7zxUNjYnw8KZLxTxaDyo5jLpump`).

## Security

- **Note:** This script is for educational purposes and should be used with caution. Ensure you understand the risks involved in automated trading.

## License

This project is licensed under the MIT License.