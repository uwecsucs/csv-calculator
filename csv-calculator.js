import { readFileSync } from "fs";

// Example usage:
const data = loadSalesData("sales.csv");

const totalSales = calculateTotalSales(data);
displayResults(totalSales, "Total Sales");
displayResults(calculateTotalQuantity(data), "Total Quantity");
displayResults(calculateAveragePrice(data), "Average Price");
displayResults(calculateHighestTotalSales(totalSales), "Highest Total Sales");
displayResults(calculateAveragePriceWeighted(data), "Weighted Average Price");

function loadSalesData(filename) {
  const data = readFileSync(filename, "utf-8").trim();
  const lines = data.split("\n");

  const headers = lines[0].split(",");
  const salesData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};

    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = values[j].trim();
    }

    salesData.push(row);
  }

  return salesData;
}

function calculateTotalSales(salesData) {
  const totalSales = {};

  for (const row of salesData) {
    const product = row.product;
    const quantity = parseInt(row.quantity, 10);
    const price = parseFloat(row.price);

    if (!(product in totalSales)) {
      totalSales[product] = 0;
    }

    totalSales[product] += quantity * price;
  }

  return totalSales;
}

function calculateTotalQuantity(salesData) {
  const totalQuantity = {};

  for (const row of salesData) {
    const product = row.product;
    const quantity = parseInt(row.quantity, 10);

    if (!(product in totalQuantity)) {
      totalQuantity[product] = 0;
    }

    totalQuantity[product] += quantity;
  }

  return totalQuantity;
}

function calculateAveragePrice(salesData) {
  const totalPrice = {};
  const totalCount = {};

  for (const row of salesData) {
    const product = row.product;
    const price = parseFloat(row.price);

    if (!(product in totalPrice)) {
      totalPrice[product] = 0;
      totalCount[product] = 0;
    }

    totalPrice[product] += price;
    totalCount[product] += 1;
  }

  const averagePrice = {};

  for (const product in totalPrice) {
    averagePrice[product] = totalPrice[product] / totalCount[product];
  }

  return averagePrice;
}

function calculateHighestTotalSales(totalSales) {
  const highestTotalSales = {};
  var highestTotalSaleValue = 0;
  var highestTotalSaleProduct;
  
  for (let product in totalSales) {
    if (highestTotalSaleValue < totalSales[product]){
      highestTotalSaleValue = totalSales[product];
      highestTotalSaleProduct = product;
    }
  }

  highestTotalSales[highestTotalSaleProduct] = highestTotalSaleValue;

  return highestTotalSales;
}

function calculateAveragePriceWeighted(salesData) {
  const totalPrice = {};
  const totalCount = {};

  for (const row of salesData) {
    const product = row.product;
    const price = parseFloat(row.price);
    const quantity = parseFloat(row.quantity);

    if (!(product in totalPrice)) {
      totalPrice[product] = 0;
      totalCount[product] = 0;
    }

    totalPrice[product] += (price * quantity);
    totalCount[product] += quantity;
  }

  const averagePrice = {};

  for (const product in totalPrice) {
    averagePrice[product] = totalPrice[product] / totalCount[product];
  }

  return averagePrice;
}

function displayResults(results, title) {
  console.log(`\n${title}`);

  for (const product in results) {
    console.log(`${product}: ${results[product].toFixed(2)}`);
  }
}
