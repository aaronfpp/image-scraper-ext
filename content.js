(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sku = urlParams.get('sku');
  if (sku && /^\d{5}$/.test(sku)) {
    const maxRetries = 10;
    let retries = 0;

    function trySetSkuAndClick() {
      const skuInput = document.getElementById('sku-input');
      const submitBtn = document.getElementById('submit-btn');

      if (skuInput && submitBtn) {
        skuInput.value = sku;
        console.log('Content script: Set SKU to', sku);
        submitBtn.click();
        console.log('Content script: Clicked submit-btn');
      } else {
        retries++;
        if (retries < maxRetries) {
          console.log('Content script: Waiting for elements, retry', retries);
          setTimeout(trySetSkuAndClick, 500); // Retry after 500ms
        } else {
          console.warn('Content script: Failed to find sku-input or submit-btn after', maxRetries, 'retries');
        }
      }
    }

    trySetSkuAndClick();
  } else {
    console.warn('Content script: Invalid or missing SKU in URL');
  }
})();