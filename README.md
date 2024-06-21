#YahooFinance API Package

YahooFinance API Package is a Node.js module for fetching historical stock market data from Yahoo Finance and saving it to CSV files.

#Installation
Install the package via npm:

```bash
npm install yfinance-api-package

Features

Fetch Historical Data: Retrieve historical stock data for a specific date range.
Fetch Today's Data: Fetch current day's stock data.
Save Data to CSV: Save fetched data to CSV files for further analysis.

Usage

Import the module and initialize an instance of YahooFinance:

const YahooFinance = require('yahoo-finance-api');
const yahooFinance = new YahooFinance();

Fetch Historical Data for a Specific Date

async function fetchDataForDate() {

  const symbol = 'AAPL'; // Replace with your desired stock symbol
  const date = '2023-12-29'; // Replace with your desired date

  try {

    const dataForDate = await yahooFinance.downloadDataForDate(symbol, date);
    if (dataForDate) {
      yahooFinance.saveDataToCSV(dataForDate, `${symbol}_${date}.csv`);
      console.log(`Data for ${date} saved to ${symbol}_${date}.csv`);
    } else {
      console.log(`No data available for ${date}`);
    }
  } catch (error) {
    console.error(`Error fetching data for ${date}: ${error.message}`);
  }
}


fetchDataForDate();


Fetch Today's Data

async function fetchDataForToday() {

  const symbol = 'SBIN.NS'; // Replace with your desired stock symbol

  try {
    const dataForToday = await yahooFinance.downloadDataForToday(symbol);
    if (dataForToday) {
      const formattedDate = new Date().toISOString().slice(0, 10);
      yahooFinance.saveDataToCSV(dataForToday, `${symbol}_today_${formattedDate}.csv`);
      console.log(`Today's data (${formattedDate}) saved to ${symbol}_today_${formattedDate}.csv`);
    } else {
      console.log(`No data available for today`);
    }

  } catch (error) {
    console.error(`Error fetching today's data: ${error.message}`);
  }
}

fetchDataForToday();


Fetch Historical Data for a Specific Period

async function fetchDataForDatesBetween() {

  const symbol = 'AAPL'; // Replace with your desired stock symbol
  const startDate = '2023-01-01'; // Replace with your desired date
  const endDate = '2023-12-29'; // Replace with your desired date

  //interval is optional,by default its daily timeframe, you can add if needed.

  try {
    const dataBetweenDate = await yahooFinance.fetchStockData(symbol, startDate, endDate, interval = '1d');
    if (dataBetweenDate) {
      yahooFinance.saveDataToCSV(dataBetweenDate, `${symbol}_${date}.csv`);
      console.log(`Data for ${date} saved to ${symbol}_${date}.csv`);
    } else {
      console.log(`No data available for ${date}`);
    }

  } catch (error) {
    console.error(`Error fetching data for ${date}: ${error.message}`);
  }
}

fetchDataForDatesBetween();

Save Data to CSV (Optional)

If you have fetched data and want to save it to CSV:

const data = 'Date,Open,High,Low,Close,Adj Close,Volume\n2023-12-29,194.14,194.66,193.17,193.58,193.33,34049900\n...';

const filePath = 'AAPL_custom_data.csv'; // Replace with desired file path

yahooFinance.saveDataToCSV(data, filePath);
console.log(`Data saved to ${filePath}`);


#API Documentation

YahooFinance Class

Methods

fetchStockData(symbol, startDate, endDate, interval = '1d'):

Fetches historical stock data for the specified symbol and date range.

downloadDataForDate(symbol, date):

Fetches historical stock data for a specific date.

downloadDataForToday(symbol):

Fetches today's stock data.


saveDataToCSV(data, filePath):

Saves provided data to a CSV file.


Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.


License

This project is licensed under the MIT License - see the LICENSE file for details.


Note: This package is created only for study purpose 

