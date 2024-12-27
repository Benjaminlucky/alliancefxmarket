import React, { useEffect } from "react";
import "./TradingViewTicker.css"; // Add a CSS file or use inline styles

const TradingViewTicker = () => {
  useEffect(() => {
    if (!document.getElementById("tradingview-ticker-script")) {
      const script = document.createElement("script");
      script.id = "tradingview-ticker-script";
      script.type = "text/javascript";
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
          { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
          { proName: "BINANCE:BTCUSDT", title: "BTC/USD" },
          { proName: "BINANCE:ETHUSDT", title: "ETH/USD" },
          { proName: "OANDA:EURUSD", title: "EUR/USD" },
        ],
        showSymbolLogo: true,
        colorTheme: "dark",
        isTransparent: false,
        displayMode: "adaptive",
        locale: "en",
      });
      document.getElementById("tradingview-widget").appendChild(script);
    }
  }, []);

  return (
    <div id="tradingview-widget" className="tradingview-ticker" />
  );
};

export default TradingViewTicker;
