import React from "react";
import { Footer } from "flowbite-react";
import { contact, documents, usefulLinks } from "../../data";
import { Link } from "react-router-dom";
import "./footer.css";
import Ticker from "../marketTicker/Ticker";
import TradingViewWidget from "../marketTicker/Ticker";
import TradingViewTicker from "../marketTicker/Ticker";
import WhatsAppChat from "../whatsapp/Whatsapp";

function Footercomp() {
  return (
    <footer>
      <div className="innerWrapper bg-black text-white justify-center">
        <div className="content w-full  flex py-10  px-5 md:px-20 lg:px-20 justify-center">
          <div className="contentWrapper grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  md:gap-10 lg:gap-16 justify-center">
            <div className="about w-full justify-center mb-3 ">
              <div className="aboutContent">
                <p className="text-gray-400 text-left">
                  Our goal is to prioritise a seamless customer service
                  experience to our customers, who are paramount to our
                  business. We are committed to offering our clients a reliable
                  and secure service so as to build a complete financial
                  portfolio that empowers them to achieve financial freedom.
                </p>
              </div>
            </div>
            <div className="usefulLink w-full flex md:text-left lg:text-left justify-center ">
              <div className="usefulLinkContent">
                <Footer.Title
                  title="USEFUL LINKS"
                  className="text-base font-bold mb-3 text-gray-400"
                />
                <Footer.LinkGroup col className="gap-2">
                  {usefulLinks.map((link, index) => (
                    <Footer.Link
                      key={index}
                      href={link.link}
                      className="text-sm"
                    >
                      {link.name}
                    </Footer.Link>
                  ))}
                </Footer.LinkGroup>
              </div>
            </div>
            <div className="documents w-full">
              <div className="documentContent">
                <Footer.Title
                  title="DOCUMENTS"
                  className="text-base font-bold mb-3 text-gray-400"
                />
                <Footer.LinkGroup col className="gap-2">
                  {documents.map((document, index) => (
                    <Footer.Link
                      key={index}
                      href={document.link}
                      className="text-sm"
                    >
                      {document.name}
                    </Footer.Link>
                  ))}
                </Footer.LinkGroup>
              </div>
            </div>
            <div className="contact w-full">
              <div className="contactContent">
                <Footer.Title
                  title="CONTACT"
                  className="text-base font-bold mb-3 text-gray-400"
                />
                <Footer.LinkGroup col className="gap-2">
                  {contact.map((contact, index) => (
                    <Footer.Link key={index}>{contact.address}</Footer.Link>
                  ))}
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom flex w-full bg-black text-white  justify-center">
        <div className="copyright w-4/5 flex justify-center">
          <p className="flex text-center py-5 text-gray-400">
            &copy; 2024 All Tunofex Fx Market. All Rights Reserved.
          </p>
        </div>
      </div>
      <div className="whatsapp">
        <WhatsAppChat />
      </div>
      <div>
        <TradingViewTicker />
      </div>
    </footer>
  );
}

export default Footercomp;
