import React from "react";
import Hero from "../../components/hero/Hero";
import Perks from "../../components/perks/Perks";

function Home() {
  return (
    <main className="pageWrapper">
      <div className="innerWrapper">
        <div className="heroSection">
          <Hero />
        </div>
        <div className="perkSection">
          <Perks />
        </div>
      </div>
    </main>
  );
}

export default Home;
