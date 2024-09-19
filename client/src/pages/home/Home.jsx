import React from "react";
import Hero from "../../components/hero/Hero";
import Perks from "../../components/perks/Perks";
import TrackRecords from "../../components/trackrecords/TrackRecords";
import HowToInvest from "../../components/howToInvest/HowToInvest";
import TradeAsset from "../../components/tradingAssets/TradeAsset";
import TestimonialCarousel from "../../components/testimonialCarousel/TestimonialCarousel";

function Home() {
  return (
    <main className="pageWrapper">
      <div className="innerWrapper">
        <div className="heroSection">
          <Hero />
        </div>
        <div className="perkSection w-full mt-20">
          <Perks />
        </div>
        <div className="trackRecordsSection w-full mt-20 flex">
          <TrackRecords />
        </div>
        <div className="howToInvestSection">
          <HowToInvest />
        </div>
        <div className="tradeAssetSection flex justify-center w-full bg-secondary-light">
          <TradeAsset />
        </div>
        <div className="testimonialSection">
          <TestimonialCarousel />
        </div>
      </div>
    </main>
  );
}

export default Home;
