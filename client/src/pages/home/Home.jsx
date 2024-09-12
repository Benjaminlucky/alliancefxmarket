import React from "react";
import Hero from "../../components/hero/Hero";

function Home() {
  return (
    <main className="pageWrapper">
      <div className="innerWrapper">
        <div className="heroSection">
          <Hero />
        </div>
      </div>
    </main>
  );
}

export default Home;
