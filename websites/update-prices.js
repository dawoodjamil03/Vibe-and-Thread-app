const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Function to replace prices
content = content.replace(/price:\s*'\$([\d.]+)'/g, (match, p1) => {
  const oldPrice = parseFloat(p1);
  // mapping: $30-$120 -> Rs 2500 - 12000 roughly. Let's multiply by roughly 100 or something. 
  // Let's just generate specific prices per category based on IDs or let's just do a math formula:
  // $45 = PKR 3500. $10 = PKR 1000.
  const pkrPrice = Math.round(oldPrice * 80 / 100) * 100; // Just some reasonable math
  return `price: 'Rs. ${pkrPrice.toLocaleString()}'`;
});

content = content.replace(/priceNum:\s*([\d.]+)/g, (match, p1) => {
  const oldPrice = parseFloat(p1);
  const pkrPrice = Math.round(oldPrice * 80 / 100) * 100;
  return `priceNum: ${pkrPrice}`;
});

fs.writeFileSync('src/data/products.js', content);
console.log('Prices updated!');
