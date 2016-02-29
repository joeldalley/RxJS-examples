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

function getPriceArray() {
    return input()
      .filter(quote => quote.price > 30)
      .map(quote => quote.price);
}

function getPriceStream(filter) {
    const data = input();

    return Rx.Observable
      .interval(300)
      .take(data.length)
      .map(idx => data[idx])
      .filter(filter)
      .map(quote => quote.price);
}

console.log("Array:");
getPriceArray().forEach(price => {
    console.log(`Prices higher than $30: ${price}`);
});
console.log("");

const lowPriceStream = getPriceStream(quote => quote.price <= 30);
const highPriceStream = getPriceStream(quote => quote.price > 30);
const mergedPriceStream = Rx.Observable.merge(lowPriceStream, highPriceStream);

console.log("Streams:");
lowPriceStream
  .subscribe(price => console.log(`Prices at $30 or lower: ${price}`));
highPriceStream
  .subscribe(price => console.log(`Prices higher than $30: ${price}`));
mergedPriceStream
  .subscribe(price => console.log(`Merged prices item: ${price}`));
