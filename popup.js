document.addEventListener('DOMContentLoaded', () => {
       const imageLinkDiv = document.getElementById('imageLink');
       const errorDiv = document.getElementById('error');

       // Query the active tab
       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
         const url = tabs[0].url;
         // Regular expression to match IFSTA shop URLs with a 5-digit SKU
         const pattern = /^https:\/\/www\.ifsta\.org\/shop\/[^/]+\/(\d{5})$/;
         const match = url.match(pattern);

         if (match) {
           const sku = match[1]; // Extract the SKU (e.g., '75190')
           const imageUrl = `https://images.ifsta.org/products/${sku}/default.png`;
           // Create a clickable link
           imageLinkDiv.innerHTML = `<a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
         } else {
           errorDiv.textContent = 'No IFSTA product URL detected.';
         }
       });
     });