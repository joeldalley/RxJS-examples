const Rx = require("rx");

function input() {
    return [
      {price: 17.50},
      {price: 25},
      {price: 45},
      {price: 1},
      {price: 35},
      {price: 100},
      {price: 37.60}
    ];
}

function getArray() {
    return input()
      .filter(quote => quote.price > 30)
      .map(quote => quote.price);
}

function getStream() {
    const data = input();

    return Rx.Observable
      .interval(300)
      .take(data.length)
      .map(x => data[x]);

}

function filteredStream(stream, filter) {
  return stream
    .filter(filter)
    .map(quote => quote.price);
}

console.log("Array:");
getArray().forEach(price => console.log(`Prices higher than $30: ${price}`));
console.log("");

const stream = getStream();

console.log("Streams:");
filteredStream(stream, quote => quote.price <= 30)
  .subscribe(price => console.log(`Prices at $30 or lower: ${price}`));

filteredStream(stream, quote => quote.price > 30)
  .subscribe(price => console.log(`Prices higher than $30: ${price}`));

