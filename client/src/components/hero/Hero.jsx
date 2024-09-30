import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="heroWrapper">
        <div className="heroContent md:py-12 md:px-20 lg:py-28 lg:px-36">
          <div className="heroTitle">
            <h1 className="font-bold  text-4xl md:text-6xl lg:text-9xl">
              One Platform unlimited Potential
            </h1>
          </div>
          <div className="heroSubTitle">
            <h3 className="text-1xl mt-2 px-7 md:text-2xl lg:text-3xl ">
              Our Platform lays the groundwork so you can focus on a future of
              financial freedom
            </h3>
          </div>
          <div className="heroButtons flex w-full gap-5 justify-center mt-5 px-5 md:mt-12">
            <Link to="/signup">
              <button className="bg-secondary-light py-3 px-6 font-semibold md:py-5 md:px-12 md:text-3xl text-xl lg:px-7 lg:py-4 text-primary border-2 border-transparent rounded-full lg:text-2xl lg:font-bold hover:bg-transparent hover:text-white hover:border-white">
                Get Started
              </button>
            </Link>
            <Link to="/">
              <button className="bg-white py-3 px-6 font-semibold text-xl md:py-5 md:px-12 md:text-3xl lg:px-7 lg:py-4 text-primary border-2 border-transparent rounded-full lg:text-2xl font-medium hover:bg-transparent hover:text-white hover:border-white">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
