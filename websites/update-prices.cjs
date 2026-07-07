const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// The multiplier to make the price realistic in PKR. 
// Old prices were $18 to $120. Let's multiply by 80 to get 1440 to 9600 PKR.
content = content.replace(/price:\s*'\$([\d.]+)'/g, (match, p1) => {
  const oldPrice = parseFloat(p1);
  const pkrPrice = Math.round(oldPrice * 80 / 100) * 100; // Round to nearest 100
  return `price: 'Rs. ${pkrPrice.toLocaleString()}'`;
});

content = content.replace(/priceNum:\s*([\d.]+)/g, (match, p1) => {
  const oldPrice = parseFloat(p1);
  const pkrPrice = Math.round(oldPrice * 80 / 100) * 100;
  return `priceNum: ${pkrPrice}`;
});

fs.writeFileSync('src/data/products.js', content);
console.log('Prices updated!');
