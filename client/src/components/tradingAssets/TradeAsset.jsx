import React from "react";
import { Link } from "react-router-dom";
import { tradingAssets, whyChoose } from "../../data";

function TradeAsset() {
  return (
    <div className="innerWrapper flex flex-col w-11/12 lg:w-4/5 py-10 lg:py-20 md:flex-row justify-center items-center mx-auto">
      <div className="assetContent w-full">
        <div className="top w-full gap-10 flex flex-col lg:py-10 md:flex-row lg:flex justify-between">
          <div className="left flex-1">
            <div className="title">
              <h5 className="uppercase font-bold  text-xl lg:text-2xl py-3">
                Why choose forex and bitcoin trade?
              </h5>
            </div>
            <div className="text">
              <p className="text-base lg:text-lg">
                Cryptocurrencies are a borderless means of exchange allowing for
                instant and cost-effective transactions across the world. There
                is no waiting, no international fees and no limitations as to
                who can or cannot send funds to whom or when and where those
                funds can be accessed.
              </p>
            </div>
            <div className="button flex mt-8 lg:mt-12">
              <Link to="/">
                <button className="rounded-full font-semibold bg-black py-3 lg:py-4 px-8 lg:px-10 border-2 border-transparent text-white text-lg hover:bg-transparent hover:border-2 hover:border-black hover:text-black ">
                  Trading Assets
                </button>
              </Link>
            </div>
          </div>
          <div className="right flex-1 mt-10 md:mt-0">
            <div className="rightContent">
              {tradingAssets.map((asset, index) => (
                <div key={index} className="assets flex gap-5 py-3 items-start">
                  <div className="icon bg-black text-white rounded-full p-3 text-2xl lg:text-3xl">
                    {React.createElement(asset.icon)}
                  </div>
                  <div className="assetText">
                    <h3 className="font-bold text-xl lg:text-2xl uppercase">
                      {asset.title}
                    </h3>
                    <p className="text-base lg:text-lg">{asset.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom w-full mt-10 lg:mt-20  flex justify-center">
          <div className="bottomContent w-full flex flex-col justify-center">
            <div className="bottomTitle lg:py-5">
              <h1 className="text-center uppercase font-extrabold text-3xl lg:font-extrabold lg:text-6xl">
                Why Choose us
              </h1>
            </div>
            <div className="whys w-full flex ">
              <div className="whysContent mt-16 w-full  md:flex lg:flex justify-between">
                {whyChoose.map((why, index) => (
                  <div
                    key={index}
                    className="why flex gap-5 py-5 flex-col items-center justify-center"
                  >
                    <div className="icon flex text-4xl text-center md:text-6xl lg:text-8xl">
                      {React.createElement(why.icon)}
                    </div>
                    <div className="subtitle">
                      <p className="text-center font-semibold 2xl">
                        {why.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeAsset;
