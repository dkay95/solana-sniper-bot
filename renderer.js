const { ipcRenderer } = require('electron');

document.getElementById('fund-wallets').addEventListener('click', () => {
  ipcRenderer.send('fund-wallets');
  document.getElementById('status').innerText = 'Funding wallets...';
});

document.getElementById('start-trading').addEventListener('click', () => {
  ipcRenderer.send('start-trading');
  document.getElementById('status').innerText = 'Trading started.';
});

document.getElementById('stop-trading').addEventListener('click', () => {
  ipcRenderer.send('stop-trading');
  document.getElementById('status').innerText = 'Trading stopped.';
});