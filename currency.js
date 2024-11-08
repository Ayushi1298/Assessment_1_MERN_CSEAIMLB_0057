
document.getElementById("convert-btn").addEventListener("click", convertCurrency);

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  if (!amount || isNaN(amount) || amount <= 0) {
    displayError("Please enter a valid amount.");
    return;
  }

  document.getElementById("error-msg").textContent = '';
  const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates.");
      }
      return response.json();
    })
    .then(data => {
      if (data && data.rates) {
        let convertedValue;

        if (fromCurrency === "USD") {
          const rate = data.rates[toCurrency];
          if (rate) {
            convertedValue = (amount * rate).toFixed(2);
            document.getElementById("converted-value").textContent = `Converted Value: ${convertedValue} ${toCurrency}`;
          } else {
            throw new Error(`Conversion rate for ${toCurrency} not found.`);
          }
        } else {
          
          const fromRate = data.rates[fromCurrency];
          const toRate = data.rates[toCurrency];

          if (fromRate && toRate) {
         
            const amountInUSD = amount / fromRate;

            
            convertedValue = (amountInUSD * toRate).toFixed(2);
            document.getElementById("converted-value").textContent = `Converted Value: ${convertedValue} ${toCurrency}`;
          } else {
            throw new Error(`Invalid currency selected or conversion rate not found.`);
          }
        }
      } else {
        throw new Error("Invalid data returned from the API.");
      }
    })
    .catch(error => {
      displayError(error.message);
    });
}

function displayError(message) {
  document.getElementById("error-msg").textContent = message;
  document.getElementById("converted-value").textContent = '';
}
