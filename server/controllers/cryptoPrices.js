import axios from 'axios';


const getCryptoPrice = async (req, res) => {
    const { coinId, currency } = req.query;
  
    if (!coinId || !currency) {
      return res.status(400).json({ error: "coinId and currency are required" });
    }
  
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`
      );
  
      console.log(`Fetched data for ${coinId}/${currency}:`, response.data); // Log the data
  
      if (!response.data[coinId]) {
        return res.status(500).json({ error: `No data found for ${coinId}/${currency}` });
      }
  
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data from CoinGecko:", error); // Log error details
      res.status(500).json({ error: "Failed to fetch data from CoinGecko", details: error.message });
    }
  };

export default getCryptoPrice;
