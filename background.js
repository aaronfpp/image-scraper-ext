// background.js (optional, can be empty)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background: Received message', message);
  sendResponse({ error: 'No actions defined' });
  return false;
});