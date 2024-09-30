const axios = require('axios');
const fs = require('fs');
const { format, addDays } = require('date-fns');

class YahooFinance {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart';
  }

  async fetchStockData(symbol, startDate, endDate, interval = '1d') {
    const url = `${this.baseUrl}/${symbol}`;
    const params = {
      period1: Math.floor(new Date(startDate).getTime() / 1000),
      period2: Math.floor(new Date(endDate).getTime() / 1000),
      interval: interval,
      events: 'history'
    };

    try {
      const response = await axios.get(url, { params });

      // Check if the data is available
      if (!response.data.chart || !response.data.chart.result) {
        throw new Error(`No data available for symbol: ${symbol}`);
      }

      return response.data.chart.result[0].indicators.quote[0]; // Adjust according to your needs
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      throw error;
    }
  }

  async downloadDataForDate(symbol, date) {
    const startDate = format(new Date(date), 'yyyy-MM-dd');
    const endDate = format(addDays(new Date(date), 1), 'yyyy-MM-dd');

    try {
      const historicalData = await this.fetchStockData(symbol, startDate, endDate);
      return historicalData;
    } catch (error) {
      console.error(`Error downloading data for ${startDate}: ${error.message}`);
      throw error;
    }
  }

  async downloadDataForToday(symbol) {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    const startDate = formattedDate;
    const endDate = format(addDays(today, 1), 'yyyy-MM-dd');

    try {
      const historicalData = await this.fetchStockData(symbol, startDate, endDate);
      return historicalData;
    } catch (error) {
      console.error(`Error downloading today's data (${formattedDate}): ${error.message}`);
      throw error;
    }
  }

  async saveDataToCSV(data, filePath) {
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    
    try {
      fs.writeFileSync(filePath, csvData);
      console.log(`Data saved to ${filePath}`);
    } catch (error) {
      console.error(`Error saving data to CSV: ${error.message}`);
      throw error;
    }
  }

  async fetchMarketCap(symbol) {
    const url = `${this.baseUrl}/${symbol}`;
    const params = {
      modules: 'financialData' // Adjust this based on the module containing shares outstanding
    };
  
    try {
      const response = await axios.get(url, { params });
  
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data for ${symbol}. Status code: MarketCap function is depricated`);
      }
  
      const result = response.data.chart.result[0];
      const regularMarketPrice = result.meta.regularMarketPrice; // Get market price
      const sharesOutstanding = result.financialData.sharesOutstanding; // Get shares outstanding
  
      if (regularMarketPrice && sharesOutstanding) {
        const marketCap = regularMarketPrice * sharesOutstanding;
        return marketCap;
      } else {
        console.warn(`Market cap data not fully available for ${symbol}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching market cap for ${symbol}: ${error.message}`);
      throw error;
    }
  }
  
}

module.exports = YahooFinance;
