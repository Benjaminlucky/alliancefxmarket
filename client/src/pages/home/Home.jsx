import React from "react";
import Hero from "../../components/hero/Hero";
import Perks from "../../components/perks/Perks";
import TrackRecords from "../../components/trackrecords/TrackRecords";
import HowToInvest from "../../components/howToInvest/HowToInvest";
import TradeAsset from "../../components/tradingAssets/TradeAsset";
import TestimonialCarousel from "../../components/testimonialCarousel/TestimonialCarousel";
import Different from "../../components/different/Different";
import Help from "../../components/help/Help";
import Trusted from "../../components/trusted/Trusted";

function Home() {
  return (
    <main className="pageWrapper">
      <div className="innerWrapper">
        <div className="heroSection">
          <Hero />
        </div>
        <div className="perkSection w-full  bg-white">
          <Perks />
        </div>
        <div className="trackRecordsSection w-full flex">
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
        <div className="differentSection flex bg-primary text-white">
          <Different />
        </div>
        <div className="helpSection">
          <Help />
        </div>
        <div className="trustedSection justify-center">
          <Trusted />
        </div>
      </div>
    </main>
  );
}

export default Home;
