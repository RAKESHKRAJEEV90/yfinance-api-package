const axios = require('axios');
const fs = require('fs');
const { format, addDays } = require('date-fns');

class YahooFinance {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com/v7/finance/download';
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
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    }
  }

  async downloadDataForDate(symbol, date) {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const startDate = formattedDate;
    const endDate = format(addDays(new Date(date), 1), 'yyyy-MM-dd');

    try {
      const historicalData = await this.fetchStockData(symbol, startDate, endDate);
      return historicalData;
    } catch (error) {
      console.error(`Error downloading data for ${formattedDate}: ${error.message}`);
      return null;
    }
  }

  async downloadDataForToday(symbol) {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    const url = `${this.baseUrl}/${symbol}?period1=${Math.floor(today.getTime() / 1000)}&period2=${Math.floor(today.getTime() / 1000)}&events=history`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error downloading today's data (${formattedDate}): ${error.message}`);
      return null;
    }
  }

  async saveDataToCSV(data, filePath) {
    try {
      fs.writeFileSync(filePath, data);
      console.log(`Data saved to ${filePath}`);
    } catch (error) {
      console.error(`Error saving data to CSV: ${error.message}`);
    }
  }
}

module.exports = YahooFinance;
