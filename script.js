function makePurchase() {
  //variables
  const furniture = ['chair', 'recliner', 'table', 'umbrella'];
  const prices = [25.50, 37.75, 49.95, 24.89];
  const shippingCosts = [20.00, 30.00, 35.00, 45.00];
  const states =
    ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'];

  //shipping zone arrays
  const zones = {
    "AK": 5, "HI": 5, "PR": 5, "VI": 5, "WA": 5, "OR": 5, "CA": 5, "NV": 5, "AZ": 5, "UT": 5, "ID": 5, "WY": 5, "MT": 5, "NM": 5,

    "ND": 4, "SD": 4, "NE": 4, "CO": 4, "OK": 4, "AR": 4, "LA": 4, "MS": 4,

    "MN": 3, "WI": 3, "MI": 3, "IA": 3, "IL": 3, "KS": 3, "MO": 3, "TN": 3, "AL": 3, "GA": 3, "FL": 3, "TX": 3,

    "DC": 2, "IN": 2, "OH": 2, "KY": 2, "WV": 2, "PA": 2, "DE": 2, "MD": 2, "VA": 2, "NC": 2, "SC": 2,

    "ME": 1, "NH": 1, "VT": 1, "NY": 1, "MA": 1, "RI": 1, "CT": 1, "NJ": 1,

  };

  let totalCost = 0;
  let shippingCost = 0;
  let taxes = 0;
  let userState = '';
  const purchasedItems = [];
  const itemQuantity = [];
  const itemPrices = [];

  while (true) {
    //item prompt
    let item = prompt('What item would you like to buy today: Chair, Recliner, Table, or Umbrella?');
    if (furniture.includes(!item.toLowerCase()) || item === '' || item === null){
      item = prompt('Invalid item. Please select a valid item: Chair, Recliner, Table, or Umbrella.');
    }

    //quanity prompt
    let quantity = prompt('How many ' + item + 's would you like to buy?');
    if (isNaN(quantity) || quantity <= 0 || quantity === '' || quantity === null) {
      quantity = prompt('Invalid quantity. Please enter a positive number.');
    }

    //push items into empty array
    purchasedItems.push(item);
    itemQuantity.push(parseInt(quantity));

    //continue shopping prompt
    let repeat = prompt('Continue shopping? Y/N');
    if (repeat.toLowerCase() == 'n') {
      break;
    }
  }

  //state prompt
  while (true) {
    userState = prompt('Please enter the two letter state abbreviation.');
    if (states.includes(userState.toUpperCase())) {
      break;
    } else {
      alert('Please enter a valid two-letter state abbreviation.');
    }
  }

  //calculate total
  for (let i = 0; i < itemPrices.length; i++) {
    totalCost += itemPrices[i];
  }

  //shipping
  if (totalCost >= 100) {
    shippingCost = 0;
  }

  //calculate shipping costs
  shippingZone = zones[userState.toUpperCase()];

  switch (shippingZone) {
    case 1:
      shippingCost = 0;
      break;
    case 2:
      shippingCost = shippingCosts[0];
      break;
    case 3:
      shippingCost = shippingCosts[1];
      break;
    case 4:
      shippingCost = shippingCosts[2];
      break;
    case 5:
      shippingCost = shippingCosts[3];
      break;
  }

  let itemTotal = 0;
  for (let i = 0; i < purchasedItems.length; i++) {
    let itemIndex = furniture.indexOf(purchasedItems[i].toLowerCase());
    if (itemIndex !== -1) {
      itemTotal += prices[itemIndex] * (itemQuantity[i]);
    }
  }

  totalCost = Math.round((itemTotal + shippingCost) * 100) / 100;
  taxes = Math.round(totalCost * 0.15 * 100) / 100;

  let receipt = '';
  for (let i = 0; i < purchasedItems.length; i++) {
    receipt += `<tr><td>${purchasedItems[i]}</td>`;
    receipt += `<td>${itemQuantity[i]}</td>`;
    receipt += `<td>${prices[i]}</td>`;
    receipt += `<td>${(prices[i] * itemQuantity[i])}</td></tr>`;
  }

  document.getElementById("purchase").innerHTML =
    `<br>
        <table>
    <tr>
     <th><h3>Item</h3></th>
     <th><h3>Quantity</h3></th>
     <th><h3>Unit Price</h3></th>
     <th><h3>Price</h3></th>
     </tr>
    <tr>
      <td>${receipt}</td>
     </table>
     <hr>
  <table>
      <tr>
         <td><h3>Item Total:</h3></td>
         <td>$${(itemTotal)}</td>
     </tr>
     <tr>
          <td><h3>Shipping to ${userState.toUpperCase()}:</h3></td>
          <td>$${(shippingCost)}</td>
      </tr>
     <tr>
         <td><h3>Subtotal: </h3></td>
         <td>$${totalCost}</td>
     </tr>
      <tr>
          <td><h3>Tax: </h3></td>
          <td>$${taxes}</td>
      </tr>
       <tr>
           <td><h3>Invoice Total: </h3></td>
           <td>$${(totalCost + shippingCost + taxes)}</td>
       </tr>
      <table>
      
       <button onclick="makePurchase()">Shop Again?</button>
    `;
}
