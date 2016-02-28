const Rx = require("rx");

function input() {
    return [
      {price: 25},
      {price: 45},
      {price: 1},
      {price: 35},
      {price: 100},
      {price: 37.60}
    ];
}

function arrayCase() {
    return input()
      .filter(quote => quote.price > 30)
      .map(quote => quote.price);
}

function streamCase() {
    const data = input();

    return Rx.Observable
      .interval(200)
      .take(data.length)
      .map(x => data[x])
      .filter(quote => quote.price > 30)
      .map(quote => quote.price);
}

console.log("Array Case:");
arrayCase().forEach(price => console.log(`Prices higher than $30: ${price}`));
console.log("");

console.log("Stream Case:");
streamCase().subscribe(price => console.log(`Prices higher than $30: ${price}`));
