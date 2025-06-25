document.addEventListener('DOMContentLoaded', () => {
  const imageLinkDiv = document.getElementById('imageLink');
  const errorDiv = document.getElementById('error');
  const downloadBtn = document.getElementById('downloadBtn');
  const loadingDiv = document.getElementById('loading');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('Tabs queried', tabs);
    if (tabs[0] && tabs[0].url) {
      const url = tabs[0].url;
      const pattern = /^https:\/\/www\.ifsta\.org\/shop\/[^/]+\/(\d{5})$/;
      const match = url.match(pattern);

      if (match) {
        const sku = match[1];
        const baseUrl = `https://images.ifsta.org/products/${sku}`;
        const imageUrl = `${baseUrl}/default.png`;
        imageLinkDiv.innerHTML = `<a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
        downloadBtn.style.display = 'block';

        downloadBtn.addEventListener('click', () => {
          console.log('Download button clicked, redirecting to Netlify app');
          loadingDiv.style.display = 'block';
          downloadBtn.disabled = true;
          // Redirect to Netlify app with SKU
          const netlifyUrl = `https://ifsta-image.netlify.app/?sku=${encodeURIComponent(sku)}`;
          chrome.tabs.create({ url: netlifyUrl }, () => {
            console.log('Opened Netlify app with SKU:', sku);
            loadingDiv.style.display = 'none';
            downloadBtn.disabled = false;
            // Optionally close the popup
            window.close();
          });
        });
      } else {
        errorDiv.textContent = 'No IFSTA product URL detected.';
      }
    } else {
      errorDiv.textContent = 'Unable to access tab URL.';
    }
  });
});